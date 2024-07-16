import { Lucia } from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { db } from "@/lib/db"
import { cookies } from "next/headers"

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "Aj-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null

  if (!sessionId) {
    return null
  }

  const { session, user } = await lucia.validateSession(sessionId)

  try {
    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch (error) {}

  const DBuser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      name: true,
      email: true,
    },
  })

  return DBuser
}
