import { buttonVariants } from "@/components/ui/button"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import Link from "next/link"

const page = () => {
  const divStyle = {
    background:
      "radial-gradient(at 50% 40%, rgb(255, 255, 255), transparent 80%) 0% 0% repeat scroll, " +
      "radial-gradient(at 50% -47%, rgb(172, 224, 249), transparent 80%) 0% 0% repeat scroll, " +
      "radial-gradient(at 0% 0%, rgb(232, 225, 255) 0px, transparent 32%) 0% 0% repeat scroll, " +
      "radial-gradient(at 100% 98%, rgb(255, 241, 235), transparent) 0% 0% repeat scroll, " +
      "radial-gradient(at 0px 97%, rgb(227, 235, 255), white) 0% 0% repeat scroll rgba(0, 0, 0, 0)",
    zIndex: 30,
  }

  return (
    <div style={divStyle}>
      <div className="dark:text-zinc-100 mx-auto w-7/8 ">
        <div className="w-7/8 mx-auto relative h-4/5 z-30 pt-6 inter  ">
          <div className=" text-center pt-8 md:pt-12 md:mt-12 mx-auto w-4/5 md:w-3/5">
            <h1 className="text-[#030647]  font-semibold text-5xl md:text-7xl dark:text-gray-200 Inter">
              {" "}
              The All-In-One Auth Solution for SaaS Founders{" "}
            </h1>
            <p className="text-lg text-[#515568] pt-2 mt-4 text-center w-4/5  mx-auto dark:text-gray-100/70 Inter">
              Streamline your workflow with the all-in-one calendar and organization app for
              founders. Get started with a free trial today, no credit card needed.{""}
            </p>
            <div className="flex flex-row mx-auto justify-center pt-6 mt-4">
              <Link
                href="/auth"
                className={buttonVariants({
                  size: "default",
                  className:
                    "md:py-6 md:text-medium focus:ring-4 font-semibold rounded-xl px-10 py-4 mb-2",
                })}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <Features />
        <Footer />
      </div>
    </div>
  )
}

export default page
