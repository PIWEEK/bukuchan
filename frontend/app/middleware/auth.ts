import { getUserFromSession } from "~/.server/auth";
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
  const user = await getUserFromSession(request);
  context.set(userContext, user);
  return next();
};
