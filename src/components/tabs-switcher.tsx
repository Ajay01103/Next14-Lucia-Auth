"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  SignUpTab: React.ReactNode
  SignInTab: React.ReactNode
}

const TabSwitcher = ({ SignInTab, SignUpTab }: PageProps) => {
  return (
    <Tabs
      className="w-[500px]"
      defaultValue="sign-in"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>

      <TabsContent value="sign-up">{SignUpTab}</TabsContent>
      <TabsContent value="sign-in">{SignInTab}</TabsContent>
    </Tabs>
  )
}

export default TabSwitcher
