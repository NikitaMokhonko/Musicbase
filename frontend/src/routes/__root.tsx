import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/header.tsx'
import Footer from '@/components/footer.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='bg-blue-800'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  ),
});
