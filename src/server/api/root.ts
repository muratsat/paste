import { pasteRouter } from "@/server/api/routers/paste";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  paste: pasteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
