import { IStream, ITask } from '@/types/types';

// Libraries
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// UI Components
import {
  Trash,
  Calendar,
  Medal,
  ThumbsDown,
  ListTodo,
  AudioLines,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import ExpandedCardDialog from './expanded-card-dialog';
import Link from 'next/link';

interface StreamCardProps {
  stream: IStream;
  setLocalStreams: React.Dispatch<React.SetStateAction<IStream[]>>;
  mutate: () => void;
}

export default function StreamCard({
  stream,
  setLocalStreams,
  mutate,
}: StreamCardProps) {
  const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
  const [deleteDialogAlertOpen, setDeleteDialogAlertOpen] = useState(false);
  const [task, setTask] = useState<ITask | null>(null);

  useEffect(() => {
    async function fetchTask() {
      if (stream.ai_generated?.spawned_task_id) {
        try {
          const response = await fetch(
            `/api/tasks?id=${stream.ai_generated.spawned_task_id.toString()}`,
          );
          if (response.ok) {
            const taskData: ITask = (await response.json()) as ITask;
            setTask(taskData);
          } else {
            console.error('Failed to fetch task:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    }
    void fetchTask();
  }, [stream]);

  const handleDeleteStream = async () => {
    try {
      const response = await fetch('/api/streams', {
        method: 'DELETE',
        body: JSON.stringify({ _id: stream._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete stream');
      }
      setLocalStreams((prevStreams) =>
        prevStreams.filter((n) => n._id !== stream._id),
      );
      toast.success('Stream deleted successfully');
      mutate(); // Revalidate the cache
    } catch (error) {
      toast.error('Failed to delete stream');
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

  const { ai_generated } = stream;

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
              stream and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <AlertDialogAction onClick={handleDeleteStream}>
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
                  {task && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/tasks/`} data-no-expand>
                            <ListTodo className="w-4 h-4 " />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-mono text-xs flex flex-row items-center gap-1">
                            <AudioLines className="w-4 h-4 inline-block" />
                            <span>Task</span>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {ai_generated?.user_input_quality_ranking?.score !==
                          undefined &&
                          (ai_generated.user_input_quality_ranking.score < 5 ? (
                            <ThumbsDown
                              className="w-4 h-4 text-red-500"
                              data-no-expand
                            />
                          ) : ai_generated.user_input_quality_ranking.score >=
                            8 ? (
                            <Medal
                              className="w-4 h-4 text-blue-500"
                              data-no-expand
                            />
                          ) : null)}
                      </TooltipTrigger>
                      {ai_generated?.user_input_quality_ranking
                        ?.score_tooltip && (
                        <TooltipContent>
                          <p className="font-mono text-xs">
                            {
                              ai_generated.user_input_quality_ranking
                                .score_tooltip
                            }{' '}
                            [score:{' '}
                            {ai_generated.user_input_quality_ranking.score}]
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs items-center flex font-mono">
                  <Calendar className="w-4 h-4 mr-2 inline-block" />
                  {format(new Date(stream.created_at), 'MMM dd')}
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
            Delete Stream & Tasks
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <ExpandedCardDialog
        stream={stream}
        expandedDialogOpen={expandedDialogOpen}
        setExpandedDialogOpen={setExpandedDialogOpen}
      />
    </>
  );
}
