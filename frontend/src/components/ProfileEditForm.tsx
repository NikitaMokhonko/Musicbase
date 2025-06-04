import React from "react";

interface ProfileEditFormProps {
  form: { name: string; bio: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; bio: string }>>;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProfileEditForm({
  form,
  setForm,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) {
  return (
    <form
      className="flex flex-col items-center gap-2 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="text-white border-2 px-2 py-1 rounded"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Name"
      />
      <textarea
        className="text-white border-2 my-2 w-[80%] px-5 py-2 rounded resize-none overflow-y-auto"
        value={form.bio}
        onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
        placeholder="Bio..."
      />
      <div className="flex gap-2 justify-center mb-5 w-full">
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
      </div>
    </form>
  );
}
