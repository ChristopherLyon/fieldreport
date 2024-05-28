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
} from "@/components/ui/tooltip"

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-full flex flex-col">

      {fetchingNotes ? (
        <NoDataContextCard title="Loading Notes" description="Please wait while we fetch your notes." />
      ) : notes.length === 0 ? (
        <NoDataContextCard title="No Notes Found" description="You have no notes. Click the button below to create a new note." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NotesCard key={note._id.toString()} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </main>
  );
}