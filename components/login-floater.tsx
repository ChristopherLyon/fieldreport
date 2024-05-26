"use client";

// Libraries
import { signIn } from "next-auth/react"

// UI Components
import { Button } from "@/components/ui/button"

export function LoginFloater() {
    return (
        <div className="md:hidden lg:block fixed top-2 right-4 z-auto p-4 z-50">
            <div className="grid gap-4">
                <Button onClick={() => signIn("google", { callbackUrl: "/app" })} variant="outline" className="w-full bg-white text-black hover:bg-gray-300 hober:text-black">
                    <span className="">
                        Login with Google
                    </span>
                    <img src="/images/logos/google-logo.webp" alt="Google Icon" className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}
