import React from "react";
import type { Song } from "../types/song";
import { SongEditForm } from "./SongEditForm";

interface SongListProps {
  groupedSongs: Record<string, Song[]>;
  orderedCategories: string[];
  isOwner: boolean;
  editingSongId: string | null;
  setEditingSongId: (id: string | null) => void;
  songEditForm: { name: string; url: string; category: string };
  setSongEditForm: React.Dispatch<
    React.SetStateAction<{ name: string; url: string; category: string }>
  >;
  onEditSong: (song: Song) => void;
  onUpdateSong: (songId: number) => void;
  onDeleteSong: (songId: number) => void;
  getSafeUrl: (url: string) => string;
}

export function SongList({
  groupedSongs,
  orderedCategories,
  isOwner,
  editingSongId,
  setEditingSongId,
  songEditForm,
  setSongEditForm,
  onEditSong,
  onUpdateSong,
  onDeleteSong,
  getSafeUrl,
}: SongListProps) {
  return (
    <div className="w-full flex pt-5 pb-5 border-t-2 border-white flex-col items-center">
      {orderedCategories.map((category) => (
        <div
          key={category}
          className="mb-6 w-full max-w-md mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl text-white mb-6 mt-2 underline underline-offset-6 decoration-pink-500">
            {category}
          </h2>
          <ul className="flex flex-col bg-gray-700 sm:rounded-none border-2 md:rounded-4xl px-2 py-1 border-white items-center w-full">
            {(groupedSongs[category] as Song[]).map((song) => (
              <li
                key={song.id}
                className="text-white flex flex-col mb-5 mt-5 items-center gap-1 w-full justify-center"
              >
                {editingSongId === song.id ? (
                  <SongEditForm
                    songEditForm={songEditForm}
                    setSongEditForm={setSongEditForm}
                    onSubmit={() => onUpdateSong(Number(song.id))}
                    onCancel={() => setEditingSongId(null)}
                  />
                ) : (
                  <>
                    <b>{song.name || "Untitled"}</b>
                    <a
                      href={getSafeUrl(song.url)}
                      className="underline text-pink-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {song.url}
                    </a>
                    {isOwner && (
                      <>
                        <button
                          className="ml-2 mt-4 py-1 bg-pink-500 border-white border-2 px-5 rounded-4xl text-white hover:cursor-pointer"
                          onClick={() => onEditSong(song)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 mt-2 px-3 py-1 bg-red-500 border-2 border-white rounded-4xl text-white hover:cursor-pointer"
                          onClick={() => onDeleteSong(Number(song.id))}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
