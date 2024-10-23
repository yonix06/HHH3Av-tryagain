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

        createMany: procedure.input($Schema.EmailListUserInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.createMany(input as any))),

        create: procedure.input($Schema.EmailListUserInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.create(input as any))),

        deleteMany: procedure.input($Schema.EmailListUserInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.deleteMany(input as any))),

        delete: procedure.input($Schema.EmailListUserInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.delete(input as any))),

        findFirst: procedure.input($Schema.EmailListUserInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).emailListUser.findFirst(input as any))),

        findMany: procedure.input($Schema.EmailListUserInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).emailListUser.findMany(input as any))),

        findUnique: procedure.input($Schema.EmailListUserInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).emailListUser.findUnique(input as any))),

        updateMany: procedure.input($Schema.EmailListUserInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.updateMany(input as any))),

        update: procedure.input($Schema.EmailListUserInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).emailListUser.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EmailListUserCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EmailListUserCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListUserGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListUserGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListUserGetPayload<T>, Context>) => Promise<Prisma.EmailListUserGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EmailListUserDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EmailListUserDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListUserGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListUserGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListUserGetPayload<T>, Context>) => Promise<Prisma.EmailListUserGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EmailListUserFindFirstArgs, TData = Prisma.EmailListUserGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListUserFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailListUserGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListUserFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListUserFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailListUserGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailListUserGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EmailListUserFindManyArgs, TData = Array<Prisma.EmailListUserGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListUserFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EmailListUserGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListUserFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListUserFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EmailListUserGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EmailListUserGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EmailListUserFindUniqueArgs, TData = Prisma.EmailListUserGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmailListUserFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmailListUserGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmailListUserFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmailListUserFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmailListUserGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmailListUserGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EmailListUserUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EmailListUserUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmailListUserUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmailListUserGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmailListUserGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmailListUserUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmailListUserUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmailListUserGetPayload<T>, Context>) => Promise<Prisma.EmailListUserGetPayload<T>>
            };

    };
}
