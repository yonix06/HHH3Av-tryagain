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

        createMany: procedure.input($Schema.EmailListInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.createMany(input as any))),

        create: procedure.input($Schema.EmailListInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.create(input as any))),

        deleteMany: procedure.input($Schema.EmailListInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.deleteMany(input as any))),

        delete: procedure.input($Schema.EmailListInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.delete(input as any))),

        findFirst: procedure.input($Schema.EmailListInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).emailList.findFirst(input as any))),

        findMany: procedure.input($Schema.EmailListInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).emailList.findMany(input as any))),

        findUnique: procedure.input($Schema.EmailListInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).emailList.findUnique(input as any))),

        updateMany: procedure.input($Schema.EmailListInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.updateMany(input as any))),

        update: procedure.input($Schema.EmailListInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailList.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EmailListCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EmailListCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListGetPayload<T>, Context>) => Promise<Prisma.EmailListGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EmailListDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EmailListDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListGetPayload<T>, Context>) => Promise<Prisma.EmailListGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EmailListFindFirstArgs, TData = Prisma.EmailListGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailListGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailListGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailListGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EmailListFindManyArgs, TData = Array<Prisma.EmailListGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EmailListGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EmailListGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EmailListGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EmailListFindUniqueArgs, TData = Prisma.EmailListGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailListGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailListGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailListGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EmailListUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EmailListUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListGetPayload<T>, Context>) => Promise<Prisma.EmailListGetPayload<T>>
            };

    };
}
