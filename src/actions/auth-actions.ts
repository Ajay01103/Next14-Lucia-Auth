"use server"

import { db } from "@/lib/db"
import { SignUpSchema, signInSchema } from "@/lib/schema"
import { z } from "zod"
import { Argon2id } from "oslo/password"
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { generateCodeVerifier, generateState } from "arctic"
import { githubOAuthClient } from "@/lib/github-oauth"

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    //if user already exist throw error
    const existingUser = await db.user.findUnique({
      where: {
        email: values.email,
      },
    })

    if (existingUser) {
      return { error: "User already exist", success: false }
    }

    const hashedPassword = await new Argon2id().hash(values.password)

    const user = await db.user.create({
      data: {
        email: values.email,
        name: values.name,
        hashedPassword,
      },
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
  } catch (err: any) {
    return { success: false }
  }
}

export const SignIn = async (values: z.infer<typeof signInSchema>) => {
  const user = await db.user.findUnique({
    where: {
      email: values.email,
    },
  })

  if (!user || !user.hashedPassword) {
    return { success: false, error: "Invalid Credentials" }
  }

  const passwordMatch = await new Argon2id().verify(user.hashedPassword, values.password)
  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials" }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = await lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return { success: true }
}

export const Logout = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

export const getGithubOAuthConsentUrl = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    const authUrl = await githubOAuthClient.createAuthorizationURL(state, {
      scopes: ["user"],
    })
    return { success: true, url: authUrl.toString() }

    return
  } catch (error: any) {
    return { success: false, error: "Something went wrong" }
  }
}
