import { ClerkProvider } from "@clerk/nextjs";

export default function Page({ children }) {
	return (
		<ClerkProvider>
			<div className="my-20 flex w-full flex-col items-center justify-center gap-10">
				{children}
			</div>
		</ClerkProvider>
	);
}
