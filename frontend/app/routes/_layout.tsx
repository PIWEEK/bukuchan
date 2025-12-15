import { Link, Outlet } from "react-router";
import { BookHeart } from "lucide-react";

export default function Layout() {
  return (
    <>
      <header className="px-6 text-center border-b-2 border-base-100 dark:border-base-800 pb-4">
        <p className="text-xl font-black tracking-wider uppercase">
          <Link to="/" className="flex items-center gap-1 justify-center">
            <BookHeart />
            Bukuchan
          </Link>
        </p>
      </header>
      <main className="h-full py-6 px-6 container mx-auto">
        <Outlet />
      </main>
    </>
  );
}
