import { ContextMenuShortcut } from "./ui/context-menu";

export default function NoDataContextCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full" x-chunk="dashboard-02-chunk-1">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}