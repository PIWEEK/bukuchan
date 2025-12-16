import { getSession } from "~/.server/auth";
import { redirect } from "react-router";
import { userContext } from "~/context";

export const authMiddleware = async (
  {
    context,
    request,
  }: {
    request: Request;
    context: any;
  },
  next: () => Promise<Response>
) => {
  const session = await getSession(request);

  context.set(userContext, session);
  return next();
};
