import React from "react";

interface SongEditFormProps {
  songEditForm: { name: string; url: string; category: string };
  setSongEditForm: React.Dispatch<
    React.SetStateAction<{ name: string; url: string; category: string }>
  >;
  onSubmit: () => void;
  onCancel: () => void;
}

export function SongEditForm({
  songEditForm,
  setSongEditForm,
  onSubmit,
  onCancel,
}: SongEditFormProps) {
  return (
    <form
      className="flex-column m-2 justify-center items-center w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <input
          className="text-white px-2 py-1 border-2 border-white rounded"
          value={songEditForm.name}
          onChange={(e) =>
            setSongEditForm((f) => ({ ...f, name: e.target.value }))
          }
          placeholder="Song Name"
        />
        <input
          className="text-white px-2 mt-1 py-1 border-2 border-white rounded"
          value={songEditForm.url}
          onChange={(e) =>
            setSongEditForm((f) => ({ ...f, url: e.target.value }))
          }
          placeholder="Song URL"
        />
        <select
          className="text-white px-2 m-2 py-1 border-2 border-white rounded"
          value={songEditForm.category}
          onChange={(e) =>
            setSongEditForm((f) => ({ ...f, category: e.target.value }))
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
      </div>
      <button
        type="submit"
        className="bg-green-500 m-2 px-2 py-1 border-2 border-white rounded text-white hover:cursor-pointer"
      >
        Save
      </button>
      <button
        type="button"
        className="bg-red-500 px-2 m-2 border-2 border-white py-1 rounded text-white hover:cursor-pointer"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
