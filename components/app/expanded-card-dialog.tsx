// Types
import { useEffect } from 'react';
import { IStream } from "@/types/types";

// UI
import MarkdownWrapper from "./markdown-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { X } from 'lucide-react';

export default function ExpandedCardDialog({
    stream,
    expandedDialogOpen,
    setExpandedDialogOpen,
}: {
    stream: IStream;
    expandedDialogOpen: boolean;
    setExpandedDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    // Close the dialog if the user presses escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setExpandedDialogOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setExpandedDialogOpen]);

    if (!expandedDialogOpen) return null;

    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
            <Card className="h-full w-full bg-background rounded-lg shadow-lg overflow-auto relative">
                <X
                    className='absolute top-2 left-2 cursor-pointer z-50 p-1'
                    onClick={() => setExpandedDialogOpen(false)}
                />
                <CardContent className='pt-5'>
                    <MarkdownWrapper markdown={stream.ai_generated?.reformatted_markdown_content || stream.raw_stream} />
                </CardContent>
            </Card>
        </div>
    );
}
