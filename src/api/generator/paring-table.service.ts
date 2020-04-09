import { Injectable } from "@nestjs/common"
import { ParingTable } from "./model/paring-table"
import { ParingTableGenerationOptions } from "./model/paring-table-generation-options"
import { ParingTableGenerator } from "./paring-table-generator"

@Injectable()
export class PairingTableService {
  public generate(
    paringTableGenerationOptions: ParingTableGenerationOptions,
  ): ParingTable {
    const paringTableGenerator: ParingTableGenerator = new ParingTableGenerator()
    return paringTableGenerator
      .withNumberOfTeams(paringTableGenerationOptions.numberOfTeams)
      .generate()
  }
}
