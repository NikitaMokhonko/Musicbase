import { SignOutButton, useUser } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser();

  return (
    <div>
      <div className="flex justify-center m-4">
        <img
          src={user?.imageUrl}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover border-2 border-white"
        />
      </div>
      <h1 className="flex justify-center text-white m-4">
        {user?.fullName ?? "Name"}
      </h1>
      <h1 className='flex justify-center text-white'>Bio</h1>
      <h1 className='flex justify-center text-white'>Songs:</h1>
      <h1 className='flex justify-center text-white'>Beats:</h1>
      <h1 className='flex justify-center text-white'>Vocals:</h1>

      <SignOutButton />
    </div>
  );
}
