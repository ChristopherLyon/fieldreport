"use client";

// Libraries
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";

import githubLogo from "@/public/images/logos/github-logo.png";
// Images
import googleLogo from "@/public/images/logos/google-logo.webp";
import signInBackground from "@/public/images/signin-page.png";

export default function SignIn() {
	return (
		<main className="flex flex-col min-h-screen overflow-hidden">
			<div className="flex flex-1 w-full lg:grid lg:grid-cols-2 dark:bg-[#0f0f0f]">
				<div className="flex items-center justify-center py-12 w-full">
					<div className="mx-auto w-[350px] gap-10 flex flex-col items-center text-center">
						<div className="flex flex-col items-center gap-2">
							<AudioLines className="h-20 w-auto" />
							<h1 className="text-2xl text-gray-900 dark:text-gray-300">
								Login to FieldReport
							</h1>
						</div>
						<div className="flex flex-col gap-4 w-full">
							<Button
								onClick={() => void signIn("google", { callbackUrl: "/" })}
								variant="outline"
								className="w-full"
								autoFocus
							>
								<span>Login with Google</span>
								<Image
									src={googleLogo}
									alt="Google Icon"
									width={16}
									height={16}
									className="ml-2"
									priority={true}
									quality={15}
								/>
							</Button>
						</div>
						<div className="text-xs text-gray-900 dark:text-gray-300">
							By signing in, you agree to our{" "}
							<Link href="https://fieldreport.ai/tos" className="underline">
								Terms
							</Link>{" "}
							and{" "}
							<Link href="https://fieldreport.ai/privacy" className="underline">
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>
				<div className="relative hidden lg:block border-l border-gray-500">
					<Image
						src={signInBackground}
						alt="Login Background"
						layout="fill"
						objectFit="cover"
						priority={true}
						placeholder="blur"
						className="absolute top-0 left-0 w-full h-full object-cover"
						quality={70}
					/>
				</div>
			</div>
			<AudioLines className="absolute bottom-5 right-5 h-5 text-gray-100 dark:text-gray-300" />
		</main>
	);
}
