import { useNavigate } from "@tanstack/react-router";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-800 w-full border-t-1 border-white">
      <div className="flex items-center justify-center">
        <a
          onClick={() => navigate({ to: "/about" })}
          className="text-white cursor-pointer">
          About
        </a>
        <a
          onClick={() => navigate({ to: "/contact" })}
          className="text-white ml-5 cursor-pointer"
        >
          Contact
        </a>
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 200,
            fontStyle: "italic",
          }}
          className=" mt-10 ml-5 mb-10 text-white"
        >
          {" "}
          © 2025 Nikita Mokhonko
        </h1>
      </div>
    </header>
  );
}
