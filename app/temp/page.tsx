"use client";
// Types
import { INote } from "@/types/types";

// Libraries
import { useState, useEffect } from "react";

// UI
import NoDataContextCard from "@/components/no-data-context-card";
import React from "react";
import PagePadding from "@/components/page-padding";
import PageBreadcrumb from "@/components/page-breadcrumb";
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

export default function Home() {
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
      <PagePadding>
        <div className="flex flex-row items-center justify-end lg:justify-between">
          <PageBreadcrumb />
          <div className="flex flex-row items-center gap-2">
            <Button onClick={() => setView("grid")} variant={"ghost"} size={"icon"} className="hidden sm:block">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LayoutGrid className="w-5 h-5 mx-auto" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
            <Button onClick={() => setView("table")} variant={"ghost"} size={"icon"} className="hidden sm:block">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Table className="w-5 h-5 mx-auto" />
                    </TooltipTrigger>
                  <TooltipContent>
                    <p>Table View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
            <NewNoteDialog />
          </div>
        </div>

        <div className="flex-1">
          {fetchingNotes ? (
            <NoDataContextCard
              title="Fetching notes..."
              description="Please wait while we fetch your notes."
            />
          ) : notes.length === 0 ? (
            <NoDataContextCard
              title="No notes found"
              description="You don't have any notes yet."
            />
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NotesCard key={note._id.toString()} note={note} setNotes={setNotes} />
              ))}
            </div>
          ) : (
            <DataTable data={notes} />
          )}
        </div>
      </PagePadding>
    </main>
  );
}
