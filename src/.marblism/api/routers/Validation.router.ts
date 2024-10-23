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

        createMany: procedure.input($Schema.ValidationInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.createMany(input as any))),

        create: procedure.input($Schema.ValidationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.create(input as any))),

        deleteMany: procedure.input($Schema.ValidationInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.deleteMany(input as any))),

        delete: procedure.input($Schema.ValidationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.delete(input as any))),

        findFirst: procedure.input($Schema.ValidationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).validation.findFirst(input as any))),

        findMany: procedure.input($Schema.ValidationInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).validation.findMany(input as any))),

        findUnique: procedure.input($Schema.ValidationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).validation.findUnique(input as any))),

        updateMany: procedure.input($Schema.ValidationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.updateMany(input as any))),

        update: procedure.input($Schema.ValidationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).validation.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ValidationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ValidationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ValidationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ValidationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ValidationGetPayload<T>, Context>) => Promise<Prisma.ValidationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ValidationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ValidationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ValidationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ValidationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ValidationGetPayload<T>, Context>) => Promise<Prisma.ValidationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ValidationFindFirstArgs, TData = Prisma.ValidationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ValidationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ValidationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ValidationFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ValidationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ValidationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ValidationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ValidationFindManyArgs, TData = Array<Prisma.ValidationGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ValidationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ValidationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ValidationFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ValidationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ValidationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ValidationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ValidationFindUniqueArgs, TData = Prisma.ValidationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ValidationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ValidationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ValidationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ValidationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ValidationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ValidationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ValidationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ValidationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ValidationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ValidationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ValidationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ValidationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ValidationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ValidationGetPayload<T>, Context>) => Promise<Prisma.ValidationGetPayload<T>>
            };

    };
}
