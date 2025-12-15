import type { Route } from "./+types/logout";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  return redirect("/login", {
    headers: {
      "Set-Cookie": `token=; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}

export default function Logout() {
  return <></>;
}
