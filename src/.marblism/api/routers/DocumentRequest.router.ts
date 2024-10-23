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

        createMany: procedure.input($Schema.DocumentRequestInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.createMany(input as any))),

        create: procedure.input($Schema.DocumentRequestInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentRequestInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentRequestInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentRequestInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).documentRequest.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentRequestInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).documentRequest.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentRequestInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentRequest.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentRequestInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.updateMany(input as any))),

        update: procedure.input($Schema.DocumentRequestInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentRequest.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentRequestCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentRequestCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentRequestGetPayload<T>, Context>) => Promise<Prisma.DocumentRequestGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentRequestDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentRequestDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentRequestGetPayload<T>, Context>) => Promise<Prisma.DocumentRequestGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentRequestFindFirstArgs, TData = Prisma.DocumentRequestGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentRequestFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentRequestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentRequestFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentRequestFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentRequestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentRequestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentRequestFindManyArgs, TData = Array<Prisma.DocumentRequestGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentRequestFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentRequestGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentRequestFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentRequestFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentRequestGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentRequestGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentRequestFindUniqueArgs, TData = Prisma.DocumentRequestGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentRequestFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentRequestGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentRequestFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentRequestFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentRequestGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentRequestGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentRequestUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentRequestUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentRequestUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentRequestGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentRequestGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentRequestUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentRequestUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentRequestGetPayload<T>, Context>) => Promise<Prisma.DocumentRequestGetPayload<T>>
            };

    };
}
