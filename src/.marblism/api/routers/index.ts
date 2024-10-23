/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createTagRouter from "./Tag.router";
import createEmailListRouter from "./EmailList.router";
import createDocumentTemplateRouter from "./DocumentTemplate.router";
import createDocumentRouter from "./Document.router";
import createDocumentVersionRouter from "./DocumentVersion.router";
import createDocumentRequestRouter from "./DocumentRequest.router";
import createValidationRouter from "./Validation.router";
import createDocumentTagRouter from "./DocumentTag.router";
import createEmailListUserRouter from "./EmailListUser.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createUserRouter from "./User.router";
import createPushNotificationRouter from "./PushNotification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as TagClientType } from "./Tag.router";
import { ClientType as EmailListClientType } from "./EmailList.router";
import { ClientType as DocumentTemplateClientType } from "./DocumentTemplate.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as DocumentVersionClientType } from "./DocumentVersion.router";
import { ClientType as DocumentRequestClientType } from "./DocumentRequest.router";
import { ClientType as ValidationClientType } from "./Validation.router";
import { ClientType as DocumentTagClientType } from "./DocumentTag.router";
import { ClientType as EmailListUserClientType } from "./EmailListUser.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PushNotificationClientType } from "./PushNotification.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        tag: createTagRouter(router, procedure),
        emailList: createEmailListRouter(router, procedure),
        documentTemplate: createDocumentTemplateRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        documentVersion: createDocumentVersionRouter(router, procedure),
        documentRequest: createDocumentRequestRouter(router, procedure),
        validation: createValidationRouter(router, procedure),
        documentTag: createDocumentTagRouter(router, procedure),
        emailListUser: createEmailListUserRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        user: createUserRouter(router, procedure),
        pushNotification: createPushNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    tag: TagClientType<AppRouter>;
    emailList: EmailListClientType<AppRouter>;
    documentTemplate: DocumentTemplateClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    documentVersion: DocumentVersionClientType<AppRouter>;
    documentRequest: DocumentRequestClientType<AppRouter>;
    validation: ValidationClientType<AppRouter>;
    documentTag: DocumentTagClientType<AppRouter>;
    emailListUser: EmailListUserClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    pushNotification: PushNotificationClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
