import { SignOutButton } from '@clerk/clerk-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className='flex justify-center text-white'>
        Hello "/profile"!
      </h1>
      <SignOutButton/>
    </div>
  );
}
