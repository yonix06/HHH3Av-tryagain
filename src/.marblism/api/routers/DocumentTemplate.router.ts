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

        createMany: procedure.input($Schema.DocumentTemplateInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.createMany(input as any))),

        create: procedure.input($Schema.DocumentTemplateInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.create(input as any))),

        deleteMany: procedure.input($Schema.DocumentTemplateInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.deleteMany(input as any))),

        delete: procedure.input($Schema.DocumentTemplateInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentTemplateInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).documentTemplate.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentTemplateInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).documentTemplate.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentTemplateInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).documentTemplate.findUnique(input as any))),

        updateMany: procedure.input($Schema.DocumentTemplateInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.updateMany(input as any))),

        update: procedure.input($Schema.DocumentTemplateInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).documentTemplate.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DocumentTemplateCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DocumentTemplateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTemplateGetPayload<T>, Context>) => Promise<Prisma.DocumentTemplateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DocumentTemplateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentTemplateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTemplateGetPayload<T>, Context>) => Promise<Prisma.DocumentTemplateGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentTemplateFindFirstArgs, TData = Prisma.DocumentTemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTemplateFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTemplateFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTemplateFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentTemplateFindManyArgs, TData = Array<Prisma.DocumentTemplateGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTemplateFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentTemplateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTemplateFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTemplateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentTemplateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentTemplateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentTemplateFindUniqueArgs, TData = Prisma.DocumentTemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentTemplateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentTemplateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentTemplateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DocumentTemplateUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DocumentTemplateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentTemplateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentTemplateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentTemplateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentTemplateGetPayload<T>, Context>) => Promise<Prisma.DocumentTemplateGetPayload<T>>
            };

    };
}
