// Types
import { INote } from "@/types/types";

// UI
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import MarkdownWrapper from "./markdown-wrapper";
import { format } from 'date-fns';

export default function ExpandedCardDialog({ note, expandedDialogOpen, setExpandedDialogOpen }: { note: INote; expandedDialogOpen: boolean; setExpandedDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Dialog open={expandedDialogOpen} onOpenChange={setExpandedDialogOpen}>
            <DialogContent className="w-full max-w-4xl mx-auto h-screen overflow-y-auto p-4 lg:p-8" style={{ margin: '20px' }}>
                    <MarkdownWrapper content={note.ai_generated.reformatted_markdown_content} />
            </DialogContent>
        </Dialog>
    )
}
