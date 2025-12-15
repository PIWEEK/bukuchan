import type { Route } from "./+types/index";
import { Button } from "~/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function DashboardIndex() {
  return (
    <article className="grid gap-4 place-content-center h-full">
      <p>You have no projects yet.</p>
      <p>
        <Button>Create a new project</Button>
      </p>
    </article>
  );
}
