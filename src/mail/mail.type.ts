export interface Mail {
  build(): MailTemplate
}

export interface MailTemplate {
  templatePath: string
  subject: string
  context: any
}
