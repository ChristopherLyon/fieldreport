

export default function PagePadding({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 p-4 lg:p-6 h-full">
            {children}
        </div>
    )
}