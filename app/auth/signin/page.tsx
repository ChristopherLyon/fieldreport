"use client";

// Libraries
import { signIn } from "next-auth/react"

// UI Components
import { Button } from "@/components/ui/button"
import Header from "@/components/frontend/header";
import { AudioLines } from "lucide-react";

export default function SignIn() {
    return (
        <main className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <div className="flex flex-1 w-full lg:grid lg:grid-cols-2 dark:bg-[#0f0f0f]">
                <div className="flex items-center justify-center py-12 w-full">
                    <div className="mx-auto w-[350px] gap-10 flex flex-col items-center text-center">
                        <div className="flex flex-col items-center gap-2">
                            <AudioLines className="h-8 w-auto" />
                            <h1 className="text-2xl text-gray-900 dark:text-gray-300">
                                Login to FieldReport
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <Button onClick={() => signIn("google", { callbackUrl: "/app" })} variant="outline" className="w-full" autoFocus>
                                <span>
                                    Login with Google
                                </span>
                                <img src="/images/logos/google-logo.webp" alt="Google Icon" className="w-4 h-4 ml-2" />
                            </Button>
                            <Button onClick={() => signIn("github", { callbackUrl: "/app" })} variant="outline" className="w-full">
                                <span>
                                    Login with Github
                                </span>
                                <img src="/images/logos/github-logo.png" alt="Github Icon" className="w-4 h-4 ml-2 dark:invert" />
                            </Button>
                        </div>
                        <div className="text-xs text-gray-900 dark:text-gray-300">
                            By signing in, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        disableRemotePlayback
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src="/videos/solar-construction.mov" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <AudioLines className="absolute bottom-5 right-5 h-5 text-gray-100 dark:text-gray-300" />

        </main>
    );
}
