import { Injectable, Logger } from "@nestjs/common"
import { TeamRepository } from "./team.repository"
import { Tournament } from "../tournament/tournament.entity"
import { Team } from "./team.entity"
import { CreateTeamDto } from "./dto/create-team.dto"
import { UpdateTeamDto } from "./dto/update-team.dto"
import { TeamNameUniqueException } from "../shared/error/team-name-unique.exception"
import { TournamentState } from "../tournament/tournament-state"
import { IlegalTournamentStateException } from "../shared/error/ilegal-tournament-state.exception"

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name)

  constructor(private readonly teamRepository: TeamRepository) {}

  findAll(tournament: Tournament): Promise<Team[]> {
    return this.teamRepository.findAll(tournament)
  }

  findOne(id: string): Promise<Team> {
    return this.teamRepository.findOneOrFail(id)
  }

  async create(
    tournament: Tournament,
    createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    this.verifyTeamChange(tournament)
    await this.verifyTeamNameIsUnique(tournament, createTeamDto.name)
    const team = new Team()
    team.name = createTeamDto.name
    team.tournament = tournament
    const createdTeam = await this.teamRepository.save(team)
    return createdTeam
  }

  async update(
    tournament: Tournament,
    id: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    this.verifyTeamChange(tournament)
    await this.verifyTeamNameIsUnique(tournament, updateTeamDto.name)
    let team
    try {
      team = await this.teamRepository.findOneOrFail(id)
      team.name = updateTeamDto.name || team.name
      team.tournament = tournament
    } catch (_) {
      this.logger.log("Team does not exist")
      return null
    }
    const updatedTeam = await this.teamRepository.save(team)
    return updatedTeam
  }

  async delete(tournament: Tournament, id: string) {
    this.verifyTeamChange(tournament)
    try {
      const team = await this.teamRepository.findOneOrFail(id)
      await this.teamRepository.delete(team.id)
    } catch (_) {
      this.logger.log("Team entity is already deleted")
    }
  }

  private async verifyTeamNameIsUnique(tournament: Tournament, name: string) {
    const numberOfDuplicates = await this.teamRepository.countTeamDuplicates(
      tournament,
      name,
    )
    if (numberOfDuplicates > 0) {
      throw new TeamNameUniqueException()
    }
  }

  private verifyTeamChange(tournament: Tournament) {
    if (tournament.state !== TournamentState.Open) {
      throw new IlegalTournamentStateException(
        "Teams can only be changed during the Open state",
      )
    }
  }
}
