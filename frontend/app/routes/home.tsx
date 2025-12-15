import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
