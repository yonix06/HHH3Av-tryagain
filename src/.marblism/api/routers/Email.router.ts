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

        createMany: procedure.input($Schema.EmailInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.createMany(input as any))),

        create: procedure.input($Schema.EmailInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.create(input as any))),

        deleteMany: procedure.input($Schema.EmailInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.deleteMany(input as any))),

        delete: procedure.input($Schema.EmailInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.delete(input as any))),

        findFirst: procedure.input($Schema.EmailInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).email.findFirst(input as any))),

        findMany: procedure.input($Schema.EmailInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).email.findMany(input as any))),

        findUnique: procedure.input($Schema.EmailInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).email.findUnique(input as any))),

        updateMany: procedure.input($Schema.EmailInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.updateMany(input as any))),

        update: procedure.input($Schema.EmailInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).email.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EmailCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EmailCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailGetPayload<T>, Context>) => Promise<Prisma.EmailGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EmailDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EmailDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailGetPayload<T>, Context>) => Promise<Prisma.EmailGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EmailFindFirstArgs, TData = Prisma.EmailGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EmailFindManyArgs, TData = Array<Prisma.EmailGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EmailFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EmailGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EmailGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EmailGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EmailFindUniqueArgs, TData = Prisma.EmailGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EmailUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EmailUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailGetPayload<T>, Context>) => Promise<Prisma.EmailGetPayload<T>>
            };

    };
}
