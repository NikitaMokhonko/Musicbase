import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/header";
import Footer from "../components/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <div
        style={{
          backgroundImage: "url('/gradient.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  ),
});
