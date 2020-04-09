import { Injectable } from "@nestjs/common"
import { createTransport, Transporter } from "nodemailer"

import { Mail } from "./mail.type"
import { TemplateService } from "./template.service"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class MailService {
  transporter: Transporter

  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: TemplateService,
  ) {
    this.transporter = createTransport({
      host: configService.get("mail.host"),
      port: configService.get("mail.port"),
      secure: true,
      auth: {
        user: configService.get("mail.username"),
        pass: configService.get("mail.password"),
      },
    })
  }

  async send(mail: Mail, to: string): Promise<void> {
    const mailTemplate = mail.build()
    const content = this.templateService.compile(
      mailTemplate.templatePath,
      mailTemplate.context,
    )
    await this.transporter.sendMail({
      from: this.configService.get("mail.from"),
      to,
      subject: mailTemplate.subject,
      html: content,
    })
  }
}
