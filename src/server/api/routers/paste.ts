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
      return ctx.db.paste.create({
        data: {
          name: input.name,
          content: input.content,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.paste.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.paste.delete({
        where: {
          id: input.id,
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

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) =>
      ctx.db.paste.findUnique({ where: { id: input.id } }),
    ),
});
