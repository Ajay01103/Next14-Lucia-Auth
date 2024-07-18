import { GitHub } from "arctic"

export const githubOAuthClient = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  { redirectURI: process.env.NEXT_PUBLIC_URL + "/api/auth/github/callback" }
)
