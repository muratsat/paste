import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const pasteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.paste.create({
        data: {
          name: input.name,
          content: input.content,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.paste.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.paste.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
