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

        createMany: procedure.input($Schema.TagInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.createMany(input as any))),

        create: procedure.input($Schema.TagInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.create(input as any))),

        deleteMany: procedure.input($Schema.TagInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.deleteMany(input as any))),

        delete: procedure.input($Schema.TagInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.delete(input as any))),

        findFirst: procedure.input($Schema.TagInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).tag.findFirst(input as any))),

        findMany: procedure.input($Schema.TagInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).tag.findMany(input as any))),

        findUnique: procedure.input($Schema.TagInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).tag.findUnique(input as any))),

        updateMany: procedure.input($Schema.TagInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.updateMany(input as any))),

        update: procedure.input($Schema.TagInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tag.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TagCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TagCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TagGetPayload<T>, Context>) => Promise<Prisma.TagGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TagDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TagDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TagGetPayload<T>, Context>) => Promise<Prisma.TagGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TagFindFirstArgs, TData = Prisma.TagGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TagFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TagFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TagFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TagFindManyArgs, TData = Array<Prisma.TagGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.TagFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TagGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TagFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TagFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TagGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TagGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TagFindUniqueArgs, TData = Prisma.TagGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TagFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TagGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TagFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TagFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TagGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TagGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TagUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TagUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TagUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TagGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TagGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TagUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TagUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TagGetPayload<T>, Context>) => Promise<Prisma.TagGetPayload<T>>
            };

    };
}
