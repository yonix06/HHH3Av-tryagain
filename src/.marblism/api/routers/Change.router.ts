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

        createMany: procedure.input($Schema.ChangeInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.createMany(input as any))),

        create: procedure.input($Schema.ChangeInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.create(input as any))),

        deleteMany: procedure.input($Schema.ChangeInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.deleteMany(input as any))),

        delete: procedure.input($Schema.ChangeInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.delete(input as any))),

        findFirst: procedure.input($Schema.ChangeInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).change.findFirst(input as any))),

        findMany: procedure.input($Schema.ChangeInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).change.findMany(input as any))),

        findUnique: procedure.input($Schema.ChangeInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).change.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChangeInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.updateMany(input as any))),

        update: procedure.input($Schema.ChangeInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).change.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChangeCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChangeCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChangeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChangeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChangeGetPayload<T>, Context>) => Promise<Prisma.ChangeGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChangeDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChangeDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChangeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChangeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChangeGetPayload<T>, Context>) => Promise<Prisma.ChangeGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChangeFindFirstArgs, TData = Prisma.ChangeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChangeFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChangeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChangeFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChangeFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChangeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChangeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChangeFindManyArgs, TData = Array<Prisma.ChangeGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ChangeFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChangeGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChangeFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChangeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChangeGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChangeGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChangeFindUniqueArgs, TData = Prisma.ChangeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChangeFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChangeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChangeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChangeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChangeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChangeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChangeUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChangeUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChangeUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChangeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChangeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChangeUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChangeUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChangeGetPayload<T>, Context>) => Promise<Prisma.ChangeGetPayload<T>>
            };

    };
}
