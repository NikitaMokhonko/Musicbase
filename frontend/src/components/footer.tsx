export default function Footer() {
  return (
    <header className="bg-gray-800 w-full border-t-1 border-white">
      <div className="flex items-center justify-center">
        <a className="text-white">About</a>
        <a className="text-white ml-5">Contact</a>
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
