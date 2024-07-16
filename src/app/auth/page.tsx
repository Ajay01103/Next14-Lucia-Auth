import SignInForm from "@/components/sign-in-form"
import SignUpForm from "@/components/sign-up-form"
import TabSwitcher from "@/components/tabs-switcher"
import { getUser } from "@/lib/lucia"
import { redirect } from "next/navigation"

const AuthPage = async () => {
  const user = await getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="flex items-center">
        <TabSwitcher
          SignInTab={<SignInForm />}
          SignUpTab={<SignUpForm />}
        />
      </div>
    </div>
  )
}

export default AuthPage
