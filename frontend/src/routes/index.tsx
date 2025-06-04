import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "../App.css";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <div
        id="border"
        className="mx-auto rounded-2xl w-100 border-black flex flex-col mt-25 mb-5 items-center justify-center"
      >
        <h1 className="md:text-5xl text-4xl text-white text-left leading-[1.1]">
          Create your <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <span className="underline decoration-pink-500 underline-offset-6">
            personalized
          </span>
          <br />
          music portfolio
        </h1>
      </div>
      <div className="mx-auto mt-30 mb-25 animation flex justify-center items-center border-2 border-white">
        <SignedOut>
          <SignInButton>
            <button className="text-center ml-2 mr-2 text-white hover:cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <RedirectOnSignIn />
        </SignedIn>
      </div>
    </>
  );
}

function RedirectOnSignIn() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: `/profile/${user.id}` });
    }
  }, [user, navigate]);

  return null;
}
