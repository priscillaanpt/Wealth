import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

type allRoles = "auth" | "unauth";

export const createRoleProtectedProcedure = (allowedRoles: allRoles[]) => {
  return publicProcedure.use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      if (allowedRoles.includes("unauth")) {
        return next();
      } else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }

    return next({
      ctx: {
        ...ctx,
        session: {
          ...ctx.session,
          user: {
            ...ctx.session.user,
          },
        },
      },
    });
  });
};
