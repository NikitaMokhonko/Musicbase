import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

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
            Contact
          </h1>
          <p className="text-md mb-4 w-[90%] mx-auto">
            For any inquiries, feedback, or support requests, please reach out
            to us at <br></br>
            <br></br>
            <a href="mailto:nikitamokhonko@gmail.com">
              nikitamokhonko@gmail.com
            </a>
          </p>
        </div>
        <div className="border-2 border-white bg-slate-800 gap-20 mt-10 pb-10 pt-4 w-[80%] max-w-xl rounded-4xl mx-auto justify-center">
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 200,
              fontStyle: "italic",
            }}
            className="text-3xl text-white pt-8 flex align-center justify-center mb-8 underline decoration-pink-500 underline-offset-5"
          >
            Socials
          </h1>
          <div className="flex items-center gap-16 align-center mb-10 justify-center">
            <a
              href="https://www.instagram.com/nikitamokhonko/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/instagram-logo.png"
                alt="Instagram"
                className="w-40 rounded-full border-2 border-white h-40 mt-6 "
              />
            </a>
            <a
              href="https://github.com/NikitaMokhonko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
              src="/github-logo.png"
              alt="Github"
              className="w-40 h-40 bg-white mt-6 rounded-full border-2 border-white"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
