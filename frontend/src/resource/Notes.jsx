import React, { useState } from "react";
import { X, BookOpen, Search } from "lucide-react";

// HTML notes
import slidingWindow from "./notes/sliding_window_notes.html?raw";
import ML_notes from "./notes/ml_notes.html?raw";

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");

  const notes = [
    {
      id: 1,
      title: "Sliding Window",
      category: "DSA",
      html: slidingWindow,
    },
    {
      id: 2,
      title: "Machine Learning",
      category: "Machine Learning",
      html: ML_notes,
    },
  ];

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <BookOpen size={24} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Notes
                  </h1>

                  <p className="text-sm text-gray-500">
                    DSA, MERN, ML and Computer Science Notes
                  </p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  pl-11 pr-4 py-3
                  border border-gray-200
                  rounded-xl
                  outline-none
                  focus:ring-2
                  focus:ring-blue-100
                  focus:border-blue-500
                  bg-gray-50
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= NOTES ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              All Notes
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredNotes.length} notes available
            </p>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-7
          "
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setSelectedNote(note)}
            />
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-24">
            <BookOpen
              size={50}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-700">
              No notes found
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Try another search.
            </p>
          </div>
        )}
      </main>

      {/* ================= FULL NOTE ================= */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/70 z-50">
          {/* Top Bar */}
          <div className="h-[70px] bg-white flex items-center justify-between px-6 border-b">
            <div>
              <h2 className="font-bold text-lg text-gray-900">
                {selectedNote.title}
              </h2>

              <p className="text-xs text-gray-500">
                {selectedNote.category}
              </p>
            </div>

            <button
              onClick={() => setSelectedNote(null)}
              className="
                w-10 h-10
                rounded-full
                bg-gray-100
                hover:bg-red-50
                hover:text-red-500
                flex items-center justify-center
                transition
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* Complete HTML Note */}
          <iframe
            srcDoc={selectedNote.html}
            title={selectedNote.title}
            className="w-full border-none bg-gray-800"
            style={{
              height: "calc(100vh - 70px)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ==================================================
   NOTE CARD
================================================== */

function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        group
        bg-white
        rounded-2xl
        border border-gray-200
        overflow-hidden
        cursor-pointer
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* ================= FIRST PAGE PREVIEW ================= */}

      <div
        className="
          relative
          bg-gray-200
          overflow-hidden
          aspect-[210/297]
          border-b
        "
      >
        <iframe
          srcDoc={note.html}
          title={`${note.title} preview`}
          scrolling="no"
          className="
            pointer-events-none
            absolute
            top-0
            left-0
            border-none
          "
          style={{
            width: "794px",
            height: "1123px",

            transform: "scale(0.36)",
            transformOrigin: "top left",
          }}
        />

        {/* Hover */}
        <div
          className="
            absolute inset-0
            bg-black/0
            group-hover:bg-black/15
            transition
            flex items-center
            justify-center
          "
        >
          <div
            className="
              bg-white
              text-gray-900
              px-4 py-2
              rounded-full
              text-sm
              font-semibold
              opacity-0
              translate-y-2
              group-hover:opacity-100
              group-hover:translate-y-0
              transition
              shadow-lg
            "
          >
            Open Notes
          </div>
        </div>
      </div>

      {/* ================= INFO ================= */}

      <div className="p-4">
        <span
          className="
            inline-block
            text-xs
            font-semibold
            text-blue-600
            bg-blue-50
            px-2.5
            py-1
            rounded-md
            mb-2
          "
        >
          {note.category}
        </span>

        <h3
          className="
            font-bold
            text-gray-900
            text-lg
            group-hover:text-blue-600
            transition
          "
        >
          {note.title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          Click to read complete notes
        </p>
      </div>
    </div>
  );
}