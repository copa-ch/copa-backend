import { EntityRepository, Repository } from "typeorm"

import { Tournament } from "./tournament.entity"

@EntityRepository(Tournament)
export class TournamentRepository extends Repository<Tournament> {
  async findOneByHash(hash: string): Promise<Tournament> {
    const tournaments = await this.find({
      take: 1,
      where: [{ adminId: hash }, { visitorId: hash }],
    })
    return tournaments[0]
  }

  async findOneByAdminHash(hash: string): Promise<Tournament> {
    const tournaments = await this.find({
      take: 1,
      where: [{ adminId: hash }],
    })
    return tournaments[0]
  }
}
