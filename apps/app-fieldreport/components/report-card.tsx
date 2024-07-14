import { IReport } from '@/types/types';

// Libraries
import { useState } from 'react';
import { format } from 'date-fns';

// UI Components
import { Trash, Calendar } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import ExpandedReportDialog from './expanded-report-dialog';

interface ReportCardProps {
  report: IReport;
  setLocalReports: React.Dispatch<React.SetStateAction<IReport[]>>;
  mutate: () => void;
}

export default function ReportCard({
  report,
  setLocalReports,
  mutate,
}: ReportCardProps) {
  const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
  const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);

  const handleDeleteReport = async () => {
    try {
      const response = await fetch('/api/reports', {
        method: 'DELETE',
        body: JSON.stringify({ _id: report._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete report');
      }
      setLocalReports((prevReports) =>
        prevReports.filter((n) => n._id !== report._id),
      );
      toast.success('Report deleted successfully');
      mutate(); // Revalidate the cache
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLElement;

    if (
      !(
        target.closest('button') ??
        target.closest('a') ??
        target.closest('[data-no-expand]')
      )
    ) {
      setExpandedDialogOpen(true);
    }
  };

  const { ai_generated } = report;

  return (
    <>
      <AlertDialog
        open={deleteDialogAlertOpen}
        onOpenChange={setDeleteDialogAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <AlertDialogAction onClick={handleDeleteReport}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ContextMenu>
        <ContextMenuTrigger>
          <Card
            onClick={handleCardClick}
            className="h-64 w-full rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-muted/10"
          >
            <CardContent className="h-full grid grid-rows-[auto_1fr_auto] p-6 gap-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md">{ai_generated?.title}</CardTitle>
                <div className="flex items-start gap-2 flex-wrap justify-end">
                  {ai_generated?.tags?.map((tag) => (
                    <Badge
                      variant={'outline'}
                      key={tag}
                      className="capitalize first-letter:text-lg"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm">
                {ai_generated?.summary}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  {ai_generated?.topic_category && (
                    <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-xs">
                      {ai_generated.topic_category.charAt(0).toUpperCase() +
                        ai_generated.topic_category.slice(1)}
                    </div>
                  )}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                  <Calendar className="w-4 h-4 mr-2 inline-block" />
                  {format(new Date(report.created_at), 'MMM dd')}
                </div>
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="text-red-500 flex flex-row items-center gap-2"
            onClick={() => setDeleteDialogAlertOpen(true)}
          >
            <Trash className="h-3 w-3" />
            Delete Report
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <ExpandedReportDialog
        report={report}
        expandedDialogOpen={expandedDialogOpen}
        setExpandedDialogOpen={setExpandedDialogOpen}
      />
    </>
  );
}
