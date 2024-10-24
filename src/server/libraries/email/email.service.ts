import { MailjetProvider } from './providers/mailjet/mailjet.provider'
import { NodemailerProvider } from './providers/nodemailer/nodemailer.provider'
import { Provider } from './providers/provider'
import { TemplateBase } from './templates/base'
import { TemplateComponents } from './templates/components'
import { TemplateInvitationToOrganization } from './templates/invitationToOrganization'
import { TemplateResetPassword } from './templates/resetPassword'
import { TemplateStyle } from './templates/style'
import { TemplateVerificationCode } from './templates/verificationCode'
import { TemplateWelcome } from './templates/welcome'

export type EmailTemplateKey = keyof typeof EmailService.templates

type SendOptions = {
  name?: string
  email?: string
  subject: string
  templateKey?: EmailTemplateKey
  content?: string
  variables: Record<string, string>
  emailListId?: string
}

export class Service {
  private provider: Provider

  public templates = {
    resetPassword: TemplateResetPassword,
    verificationCode: TemplateVerificationCode,
    welcome: TemplateWelcome,
    invitationToOrganization: TemplateInvitationToOrganization,
  }

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production'

    if (isProduction) {
      this.provider = new MailjetProvider()
    } else {
      this.provider = new NodemailerProvider()
    }
  }

  /**
   * Send an email
   * @param options SendOptions including emailListId for bulk sending
   */
  async send(options: SendOptions): Promise<void> {
    const content = this.templates[options.templateKey] ?? options.content

    const contentBuilt = this.getTemplate({
      content,
      variables: options.variables,
    })

    let recipients: { name: string; email: string }[];
    if (options.emailListId) {
      recipients = await this.getEmailListRecipients(options.emailListId);
    } else if (options.email) {
      recipients = [{ name: options.name ?? options.email, email: options.email }];
    } else {
      throw new Error('Either email or emailListId must be provided');
    }

    const sendOptions = {
      content: contentBuilt,
      to: recipients,
      variables: options.variables,
      subject: options.subject,
    }

    return this.provider
      .send(sendOptions)
      .then(() => {
        console.log(`Email sent`, options)
      })
  }

  private async getEmailListRecipients(emailListId: string): Promise<{ name: string; email: string }[]> {
    // TODO: Implement the logic to fetch recipients from the email list
    // This should query the database or an external service to get the list of recipients
    // For now, we'll return an empty array as a placeholder
    return [];
  }

  getTemplate(options: {
    content: string
    variables: Record<string, string>
  }): string {
    const values = options.variables ?? { content: options.content }

    const contentBase = TemplateBase

    const contentCSS = TemplateStyle

    const contentTemplate = options.content

    let content = this.buildContent(contentTemplate, values)

    content = this.buildContent(contentBase, { style: contentCSS, content })

    content = this.buildComponents(content)

    return content
  }

  private buildContent(content: string, values: Record<string, any>): string {
    let contentBuilt = content

    for (const [key, value] of Object.entries(values)) {
      const token = new RegExp(`\{\{ ${key} \}\}`, 'g')

      contentBuilt = contentBuilt.replace(token, value)
    }

    return contentBuilt
  }

  private buildComponents(content: string): string {
    let contentUpdated = content

    for (const [key, value] of Object.entries(TemplateComponents)) {
      const tag = new RegExp(`${key}`, 'g')
      contentUpdated = contentUpdated.replace(tag, value)
    }

    return contentUpdated
  }
}

class Singleton {
  static service = new Service()
}

export const EmailService = Singleton.service
