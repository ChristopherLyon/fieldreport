"use client";

// Types
import { INote } from "@/types/types";

// Libraries
import { useState, useEffect, use } from "react";

// UI
import NoDataContextCard from "@/components/no-data-context-card";
import React from "react";
import PagePadding from "@/components/page-padding";
import PageBreadcrumb from "@/components/page-breadcrumb";
import NotesCard from "@/components/app/notes-card";
import NewNoteDialog from "@/components/app/new-note-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button";
import { Grid, LayoutGrid, Table } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [fetchingNotes, setFetchingNotes] = useState<boolean>(true);

  React.useEffect(() => {
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

        <Tabs defaultValue="layout-grid" className="w-full">
          <div className="flex flex-row items-center justify-between">
            <PageBreadcrumb />

            <div className="flex flex-row items-center">
              <TabsList className="bg-transparent pr-3">
                <TabsTrigger value="layout-grid">
                  <LayoutGrid className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="layout-table">
                  <Table className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
              <NewNoteDialog />
            </div>
          </div>
          <TabsContent value="layout-grid">

            {fetchingNotes ? (
              <NoDataContextCard
                title="Fetching notes..."
                description="Please wait while we fetch your notes."
              />
            ) : (
              <div className="flex-1">
                {notes.length === 0 ? (
                  <NoDataContextCard
                    title="No notes found"
                    description="You don't have any notes yet."
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                      <NotesCard key={note._id.toString()} note={note} setNotes={setNotes} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="layout-table"></TabsContent>
        </Tabs>
      </PagePadding>
    </main>
  );
}
