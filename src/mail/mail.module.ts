import { Module } from "@nestjs/common"

import { MailService } from "./mail.service"
import { TemplateService } from "./template.service"

@Module({
  // imports: [ConfigModule],
  providers: [TemplateService, MailService],
  exports: [MailService],
})
export class MailModule {}
