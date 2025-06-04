import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto mb-15">
        <div className="border-2 border-white bg-slate-800 text-white rounded-3xl p-10 flex flex-col items-center justify-center mt-15 max-w-xl mx-auto text-center">
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 200,
              fontStyle: "italic",
            }}
            className="text-3xl mb-5 underline decoration-pink-500 underline-offset-5"
          >
            About musicbase
          </h1>
          <p className="text-md mb-4 w-[90%] mx-auto">
            musicbase is a platform built by musicians, for musicians.
            <br></br> <br></br>Our mission is to make it effortless for artists
            to organize and share their music to the world. With our
            user-friendly interface you can showcase your work, connect with
            your audience, and focus on what matters most - creating great
            music. <br></br>
            <br></br>Join our community and take your music journey to the next
            level!
          </p>
        </div>
        <div className="border-2 border-white bg-slate-800 text-white rounded-3xl p-10 flex flex-col items-center justify-center mt-10 max-w-xl mx-auto text-center">
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 200,
              fontStyle: "italic",
            }}
            className="text-3xl underline mb-5 underline decoration-pink-500 underline-offset-5"
          >
            About me
          </h1>
          <p className="text-md mb-4 w-[90%] mx-auto">
            My name is Nikita Mokhonko, and I'm a full-stack software developer
            from Stockholm, Sweden. I created musicbase to provide a platform
            where users can easily manage their music and share it with other
            people. <br></br>
            <br></br>I hope you enjoy using musicbase as much as I enjoyed
            building it!
          </p>
        </div>
      </div>
    </div>
  );
}
