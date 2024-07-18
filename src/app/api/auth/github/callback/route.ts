import { db } from "@/lib/db"
import { githubOAuthClient } from "@/lib/github-oauth"
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  if (!state) {
    console.error("no code or state")
    return new Response("Invalid Request", { status: 400 })
  }

  //   const codeVerifier = cookies().get("codeVerifier")?.value
  const savedState = cookies().get("state")?.value

  if (!savedState) {
    console.error("no code verifier or state")
    return new Response("Invalid Request", { status: 400 })
  }

  if (state !== savedState) {
    console.error("state mismatch")
    return new Response("Invalid Request", { status: 400 })
  }

  const { accessToken } = await githubOAuthClient.validateAuthorizationCode(state)
  const githubResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const githubData = (await githubResponse.json()) as {
    id: number
    email: string
    name: string
    avatar_url: string
  }

  let userId: string = ""

  const existingUser = await db.user.findUnique({
    where: {
      email: githubData.email,
    },
  })

  if (existingUser) {
    userId = existingUser.id
  } else {
    const user = await db.user.create({
      data: {
        name: githubData.name,
        email: githubData.email,
        picture: githubData.avatar_url,
      },
    })
    userId = user.id
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = await lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return redirect("/dashboard")
}
