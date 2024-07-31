import { getGoogleOAuthConsentUrl } from "@/actions/auth-actions"
import { Button } from "./ui/button"
import { toast } from "sonner"

export const GithubOAuthButton = () => {
  return (
    <Button
      onClick={async () => {
        const res = await getGoogleOAuthConsentUrl()
        if (res?.url) {
          window.location.href = res.url
        } else {
          toast.error("Something went wrong", {
            description: res?.error,
          })
        }
      }}
      variant="secondary"
      className="flex w-full gap-x-2 items-center justify-center"
    >
      <img
        src="https://www.svgrepo.com/show/380993/google-logo-search-new.svg"
        width={25}
        height={25}
        alt=""
      />
      Continue with Github
    </Button>
  )
}
