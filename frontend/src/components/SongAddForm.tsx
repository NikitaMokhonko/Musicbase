import React from "react";

interface SongAddFormProps {
  newSong: { name: string; url: string; category: string } | null;
  setNewSong: React.Dispatch<
    React.SetStateAction<{ name: string; url: string; category: string } | null>
  >;
  onSubmit: () => void;
  onCancel: () => void;
}

export function SongAddForm({
  newSong,
  setNewSong,
  onSubmit,
  onCancel,
}: SongAddFormProps) {
  if (!newSong) return null;
  return (
    <form
      className="flex flex-col items-center gap-2 mt-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="text-white px-2 py-1 rounded border-2 border-white placeholder-white bg-transparent"
        value={newSong.name}
        onChange={(e) => setNewSong((s) => s && { ...s, name: e.target.value })}
        placeholder="Song Name"
      />
      <input
        className="text-white px-2 py-1 rounded border-2 border-white placeholder-white bg-transparent"
        value={newSong.url}
        onChange={(e) => setNewSong((s) => s && { ...s, url: e.target.value })}
        placeholder="Song URL"
      />
      <select
        className="text-white border-2 border-white px-2 py-1 rounded"
        value={newSong.category}
        onChange={(e) =>
          setNewSong((s) => s && { ...s, category: e.target.value })
        }
      >
        <option value="" disabled>
          Select Category
        </option>
        <option className="text-black" value="Songs">
          Songs
        </option>
        <option className="text-black" value="Beats">
          Beats
        </option>
        <option className="text-black" value="Vocals">
          Vocals
        </option>
      </select>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="bg-green-500 m-2 px-2 py-1 border-2 border-white rounded text-white hover:cursor-pointer"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 px-2 m-2 border-2 border-white py-1 rounded text-white hover:cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
