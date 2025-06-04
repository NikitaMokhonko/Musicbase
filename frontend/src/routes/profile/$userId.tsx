import { SignOutButton, useUser } from "@clerk/clerk-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useClerkToken } from "../../utils/useClerkToken";
import {
  useProfileQuery,
  useProfileUpdateMutation,
  useProfileCreateMutation,
  useSongsQuery,
  useSongMutation,
  useSongUpdateMutation,
  useSongDeleteMutation,
} from "../../utils/profileApi";
import { ProfileBioHeader } from "../../components/ProfileBioHeader";
import { ProfileEditForm } from "../../components/ProfileEditForm";
import { SongList } from "../../components/SongList";
import { SongAddForm } from "../../components/SongAddForm";
import { ProfileActions } from "../../components/ProfileActions";
import type { Song } from "../../types/song";

export const Route = createFileRoute("/profile/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();
  const { userId: profileUserId } = Route.useParams();
  const isOwner = user?.id === profileUserId;
  const navigate = useNavigate();
  const token = useClerkToken();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "" });
  const {
    data: profileData,
    isLoading,
    error: profileError,
  } = useProfileQuery(profileUserId, token);
  const updateProfile = useProfileUpdateMutation(profileUserId, token);
  const createProfile = useProfileCreateMutation(token);
  const {
    data: songsData,
    isLoading: songsLoading,
    error: songsError,
  } = useSongsQuery(profileUserId, token);
  const addSong = useSongMutation(token);
  const updateSong = useSongUpdateMutation(token);
  const deleteSong = useSongDeleteMutation(token);
  const [newSong, setNewSong] = useState<null | {
    name: string;
    url: string;
    category: string;
  }>(null);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [songEditForm, setSongEditForm] = useState({
    name: "",
    url: "",
    category: "",
  });
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    if (profileData) {
      setForm({ name: profileData.name || "", bio: profileData.bio || "" });
    }
  }, [profileData]);

  const isNotFound = (profileError as any)?.status === 404;

  useEffect(() => {
    if (isOwner && isNotFound && !profileCreated && user) {
      createProfile.mutate(
        {
          userId: user.id,
          name: user.fullName || user.username || "",
          bio: "",
        },
        {
          onSuccess: () => setProfileCreated(true),
        }
      );
    }
  }, [isOwner, isNotFound, profileCreated, user, createProfile]);

  if (isLoading || (isOwner && isNotFound && !profileCreated))
    return (
      <div className="flex justify-center items-center h-120">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500 border-solid"></div>
      </div>
    );
  if (profileError && !isNotFound)
    return (
      <div className="text-red-500 flex align-center justify-center m-55">
        <h1 className="border-2 border-red-500 text-red-500 bg-gray-800 px-4 py-1 rounded-4xl">
          Failed to load profile
        </h1>
      </div>
    );

  const showProfile = profileData || isNotFound;
  const profile = profileData || { name: "", bio: "", songs: [] };

  const categoryOrder = ["Songs", "Beats", "Vocals"];
  const groupedSongs = (songsData || []).reduce(
    (acc: Record<string, Song[]>, song: Song) => {
      const cat = song.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(song);
      return acc;
    },
    {}
  );
  const orderedCategories = [
    ...categoryOrder.filter((cat) => groupedSongs[cat]),
    ...Object.keys(groupedSongs).filter((cat) => !categoryOrder.includes(cat)),
  ];

  const getSafeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  const handleEditSong = (song: Song) => {
    setEditingSongId(song.id);
    setSongEditForm({
      name: song.name,
      url: song.url,
      category: song.category,
    });
  };
  const handleUpdateSong = (songId: number) => {
    updateSong.mutate(
      {
        songId,
        name: songEditForm.name,
        url: songEditForm.url,
        category: songEditForm.category,
        userId: profileUserId,
      },
      { onSuccess: () => setEditingSongId(null) }
    );
  };
  const handleDeleteSong = (songId: number) => {
    deleteSong.mutate({ songId, userId: profileUserId });
  };
  const handleAddSong = () => {
    if (
      !newSong ||
      !newSong.url.trim() ||
      !newSong.category.trim() ||
      !newSong.name.trim()
    )
      return;
    addSong.mutate(
      { ...newSong, userId: profileUserId },
      {
        onSuccess: () => setNewSong(null),
      }
    );
  };

  return (
    <>
      <div className="mt-15 border-2 bg-slate-800 rounded-4xl flex flex-col justify-center items-center border-purple-300 w-[80%] max-w-xl mb-10 mx-auto text-center min-h-[80vh]">
        <ProfileBioHeader profile={profile} />
        {isOwner && showProfile && !editing && (
          <ProfileActions
            onEdit={() => setEditing(true)}
            showEdit={true}
            profileData={profileData}
          ></ProfileActions>
        )}
        {isOwner && showProfile && editing && (
          <ProfileEditForm
            form={form}
            setForm={setForm}
            onSubmit={() =>
              updateProfile.mutate(form, { onSuccess: () => setEditing(false) })
            }
            onCancel={() => setEditing(false)}
          />
        )}
        {songsLoading ? (
          <div className="flex justify-center items-center h-24 w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500 border-solid"></div>
          </div>
        ) : songsError ? (
          <div className="text-red-500 w-full flex justify-center">
            Failed to load songs
          </div>
        ) : (
          <SongList
            groupedSongs={groupedSongs}
            orderedCategories={orderedCategories}
            isOwner={isOwner}
            editingSongId={editingSongId}
            setEditingSongId={setEditingSongId}
            songEditForm={songEditForm}
            setSongEditForm={setSongEditForm}
            onEditSong={handleEditSong}
            onUpdateSong={handleUpdateSong}
            onDeleteSong={handleDeleteSong}
            getSafeUrl={getSafeUrl}
          />
        )}
        {isOwner && (
          <div className="w-full flex flex-col items-center">
            {newSong === null ? (
              <div className="flex justify-center w-full">
                <button
                  className="bg-pink-500 mb-5 px-4 py-2 rounded-4xl w-30 border-2 text-white hover:cursor-pointer"
                  onClick={() =>
                    setNewSong({ name: "", url: "", category: "" })
                  }
                >
                  Add Song
                </button>
              </div>
            ) : (
              <SongAddForm
                newSong={newSong}
                setNewSong={setNewSong}
                onSubmit={handleAddSong}
                onCancel={() => setNewSong(null)}
              />
            )}
          </div>
        )}
        {isOwner && showProfile && !editing && (
          <SignOutButton>
            <button className="border-2 mb-10 mt-5 border-red-500 text-red-500 bg-gray-800 px-4 py-1 rounded-4xl hover:cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
        )}
      </div>
      <div>
        {!isOwner && (
          <a
            onClick={() => navigate({ to: "/" })}
            className="flex justify-center bg-gray-800 w-fit align-center mb-14 mt-14 mx-auto px-6 py-2 border-2 border-green-500 hover:cursor-pointer rounded-4xl text-green-500 m-5"
          >
            Create your own profile here!
          </a>
        )}
      </div>
    </>
  );
}