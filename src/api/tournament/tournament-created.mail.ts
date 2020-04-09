import { join } from "path"
import { Tournament } from "./tournament.entity"
import { Mail, MailTemplate } from "../../mail/mail.type"

export class TournamentCreatedMail implements Mail {
  constructor(
    private readonly tournament: Tournament,
    private readonly clientUrl: string,
  ) {}

  build(): MailTemplate {
    return {
      templatePath: "resources/mail/tournament-created.mail.html",
      subject: "Your new Tournament is ready",
      context: {
        ...this.tournament,
        link: join(this.clientUrl, this.tournament.adminId, "admin"),
      },
    } as MailTemplate
  }
}
