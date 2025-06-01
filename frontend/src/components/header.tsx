

export default function Header() {
  return (
    <header className="bg-gray-800 w-full border-b-1 border-white">
      <div className="flex items-center justify-center">
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 200,
            fontStyle: "italic",
          }}
          className="text-4xl m-10 text-white underline decoration-pink-500 underline-offset-5"
        >
          {" "}
          musicbase
        </h1>
      </div>
    </header>
  );
}
