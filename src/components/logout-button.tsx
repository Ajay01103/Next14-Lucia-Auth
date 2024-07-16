"use client"

import { Button } from "@/components/ui/button"
import { Logout } from "@/actions/auth-actions"

interface PageProps {
  children: React.ReactNode
}

export const LogoutButton = ({ children }: PageProps) => {
  return (
    <Button
      className="grid w-full"
      variant="destructive"
      size="sm"
      onClick={() => Logout()}
    >
      {children}
    </Button>
  )
}
