import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="h-full py-6 px-6">
      <h1 className="text-4xl font-bold">
        <a href="/">Bukuchan</a>
      </h1>
    </main>
  );
}
