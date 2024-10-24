/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.StatusInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.createMany(input as any))),

        create: procedure.input($Schema.StatusInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.create(input as any))),

        deleteMany: procedure.input($Schema.StatusInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.deleteMany(input as any))),

        delete: procedure.input($Schema.StatusInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.delete(input as any))),

        findFirst: procedure.input($Schema.StatusInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).status.findFirst(input as any))),

        findMany: procedure.input($Schema.StatusInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).status.findMany(input as any))),

        findUnique: procedure.input($Schema.StatusInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).status.findUnique(input as any))),

        updateMany: procedure.input($Schema.StatusInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.updateMany(input as any))),

        update: procedure.input($Schema.StatusInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).status.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.StatusCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.StatusCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StatusGetPayload<T>, Context>) => Promise<Prisma.StatusGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.StatusDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.StatusDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StatusGetPayload<T>, Context>) => Promise<Prisma.StatusGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.StatusFindFirstArgs, TData = Prisma.StatusGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StatusFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StatusGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StatusFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StatusFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StatusGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StatusGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.StatusFindManyArgs, TData = Array<Prisma.StatusGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.StatusFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.StatusGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StatusFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StatusFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.StatusGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.StatusGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.StatusFindUniqueArgs, TData = Prisma.StatusGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StatusFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StatusGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StatusFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StatusFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StatusGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StatusGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.StatusUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.StatusUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StatusUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StatusGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StatusGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StatusUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StatusUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StatusGetPayload<T>, Context>) => Promise<Prisma.StatusGetPayload<T>>
            };

    };
}
