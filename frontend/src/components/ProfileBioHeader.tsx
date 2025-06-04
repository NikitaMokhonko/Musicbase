export function ProfileBioHeader({
  profile,
}: {
  profile: { name: string; bio: string };
}) {
  return (
    <div className="w-[80%] flex flex-col items-center">
      <h1 className="flex justify-center text-white mt-10 mb-5 text-3xl underline underline-offset-8 decoration-pink-500">
        {profile?.name || "Name"}
      </h1>
      <h1
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 200,
          fontStyle: "italic",
        }}
        className="flex justify-center p-2 mb-10 mt-5 text-white"
      >
        {profile?.bio || "Bio"}
      </h1>
    </div>
  );
}
