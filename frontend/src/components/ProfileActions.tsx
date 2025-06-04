import React from "react";

interface ProfileActionsProps {
  onEdit: () => void;
  showEdit: boolean;
  profileData: any;
  children?: React.ReactNode;
}

export function ProfileActions({
  onEdit,
  showEdit,
  profileData,
  children,
}: ProfileActionsProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {showEdit && (
        <button
          className="mb-10 mt-2 px-4 py-2 border-white border-2 bg-pink-500 rounded-4xl w-30 text-white hover:cursor-pointer"
          onClick={onEdit}
        >
          {profileData ? "Edit Profile" : "Create Profile"}
        </button>
      )}
      {children}
    </div>
  );
}
