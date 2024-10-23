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

        createMany: procedure.input($Schema.DocumentTagInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.createMany(input as any))),

        create: procedure.input($Schema.DocumentTagInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentTagInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentTagInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentTagInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).documentTag.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentTagInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).documentTag.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentTagInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentTag.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentTagInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.updateMany(input as any))),

        update: procedure.input($Schema.DocumentTagInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTag.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentTagCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentTagCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTagGetPayload<T>, Context>) => Promise<Prisma.DocumentTagGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentTagDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentTagDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTagGetPayload<T>, Context>) => Promise<Prisma.DocumentTagGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentTagFindFirstArgs, TData = Prisma.DocumentTagGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTagFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentTagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTagFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTagFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentTagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentTagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentTagFindManyArgs, TData = Array<Prisma.DocumentTagGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTagFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentTagGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTagFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTagFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentTagGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentTagGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentTagFindUniqueArgs, TData = Prisma.DocumentTagGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTagFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentTagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTagFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTagFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentTagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentTagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentTagUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentTagUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTagUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTagUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTagUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTagGetPayload<T>, Context>) => Promise<Prisma.DocumentTagGetPayload<T>>
            };

    };
}
