"use client";
// Types
import { INote } from "@/types/types";

// Libraries
import { useState, useEffect } from "react";

// UI
import NoDataContextCard from "@/components/no-data-context-card";
import React from "react";
import NotesCard from "@/components/app/notes-card";
import NewNoteDialog from "@/components/app/new-note-dialog";
import { Button } from "@/components/ui/button";
import { Grid, LayoutGrid, Table } from "lucide-react";
import { DataTable } from "@/components/app/notes-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"

export default function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [fetchingNotes, setFetchingNotes] = useState<boolean>(true);
  const [view, setView] = useState<string>("grid");

  useEffect(() => {
    const fetchNotes = () => {
      fetch("/api/backend/notes")
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
          setFetchingNotes(false);
        });
    };

    fetchNotes();
    const interval = setInterval(() => {
      fetchNotes();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-full flex flex-row gap-4">
      {fetchingNotes ? (
        <NoDataContextCard title="Loading Notes" description="Please wait while we fetch your notes." />
      ) : notes.length === 0 ? (
        <NoDataContextCard title="No Notes Found" description="You have no notes. Click the button below to create a new note." />
      ) : (
        <div className="w-3/4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {notes.map((note) => (
            <NotesCard key={note._id.toString()} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
      <div className="w-1/4 flex flex-col gap-4">
        <Textarea className="w-full h-[340px] bg-background border-dashed" placeholder="Quick Report" />
        <Card className="w-full h-full flex flex-col bg-background border-dashed">
        </Card>
      </div>
    </main>
  );
}
