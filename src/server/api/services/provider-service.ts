import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const addFinancialProvider = async (db: PrismaClient, input: { name: string }) => {
    const existingProvider = await db.financialServiceProvider.findUnique({
        where: {
            name: input.name,
        },
    });

    if (existingProvider) {
        throw new TRPCError({
            message: "Provider with that name already exists!",
            code: "BAD_REQUEST",
        });
    }

    const newProvider = await db.financialServiceProvider.create({
        data: {
            name: input.name
        }
    })

    return newProvider;
};

export const addProviderAccount = async (db: PrismaClient, input: { userId: string, providerName: string }) => {
    const existingProvider = await db.financialServiceProvider.findUnique({
        where: {
            name: input.providerName,
        },
    });

    if (!existingProvider) {
        throw new TRPCError({
            message: "No provider exists with that name!",
            code: "BAD_REQUEST",
        });
    }

    const newAcc = await db.userProviderAccount.create({
        data: {
            userId: input.userId,
            providerId: existingProvider.id,
        }
    })

    return newAcc;
};

export const addTransaction = async (db: PrismaClient, input: { nominal: number, type: "PEMASUKAN" | "PENGELUARAN", transactionDate: Date, accountId: string }) => {
    const existingAccount = await db.userProviderAccount.findUnique({
        where: {
            id: input.accountId,
        },
    });

    if (!existingAccount) {
        throw new TRPCError({
            message: "No account exists with that id!",
            code: "BAD_REQUEST",
        });
    }

    const newTransaction = await db.userProviderTransactions.create({
        data: {
            nominal: input.nominal,
            type: input.type,
            transactionDate: input.transactionDate,
            accountId: input.accountId
        }
    })

    return newTransaction;
};