import { Injectable } from "@nestjs/common"
import { readFileSync } from "fs"
import { resolve } from "path"
import * as Handlebars from "handlebars"

@Injectable()
export class TemplateService {
  compile(templatePath: string, context: any): string {
    const source = readFileSync(resolve(__dirname, "../../", templatePath), {
      encoding: "utf-8",
    })
    return Handlebars.compile(source)(context)
  }
}
