import type { Route } from "./+types/dashboard";
import Heading from "~/ui/heading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Dashboard() {
  return (
    <article>
      <Heading>Welcome back!</Heading>
    </article>
  );
}
