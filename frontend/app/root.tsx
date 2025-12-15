import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import { BookHeart } from "lucide-react";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.svg",
    type: "image/svg+xml",
  },
  // TODO: Uncomment this to use Google Fonts
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full py-6">
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
      <footer className="px-6 text-center">
        <p>
          Made with love by Alonso and Belén |{" "}
          <a href="https://github.com/piweek/bukuchan">Github</a>
        </p>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let code: number | undefined;

  if (isRouteErrorResponse(error)) {
    code = error.status;
    message = error.statusText;
    // message = error.status === 404 ? "Page not found" : "Error";
    details =
      error.status === 404
        ? "Oops! This is not the page you are looking for."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto h-full">
      <article className="text-center">
        <p className="text-2xl font-semibold">{code}</p>
        <h1 className="mt-4 text-5xl font-bold">{message}</h1>
        <p className="mt-6 text-lg">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </article>
    </main>
  );
}
