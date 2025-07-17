import z from "zod";
import { addFinancialProvider, addProviderAccount, addTransaction } from "../services/provider-service";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const providerRouter = createTRPCRouter({
    addFinancialProvider: publicProcedure.input(z.object({
        name: z.string()
    })).mutation(async ({ ctx, input }) => {
        return await addFinancialProvider(ctx.db, input);
    }),

    addProviderAccount: publicProcedure.input(z.object({
        userId: z.string(),
        providerName: z.string()
    })).mutation(async ({ ctx, input }) => {
        return await addProviderAccount(ctx.db, input);
    }),

    addTransaction: publicProcedure.input(z.object({
        nominal: z.number(),
        type: z.enum(["PEMASUKAN", "PENGELUARAN"]),
        transactionDate: z.date(),
        accountId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        return await addTransaction(ctx.db, input);
    }),
});
