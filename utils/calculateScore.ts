import { Score, TeamType } from "@/app/score";
import { TeamData } from "@/components/custom/finish-game-modal";
import { AddKey, Adds, Cards4 } from "@/constants/values";

export function calculateStore(teamData: TeamData, currentRound: Score, team: TeamType) {
  const baseScore = Number(teamData.score);
  const addKeys = Object.keys(teamData.adds) as AddKey[];

  let addsScore = 0;
  addKeys.forEach(addKey => {
    addsScore += Adds[addKey].value * (teamData?.adds[addKey] ?? 1)
  })

  teamData.cards4.forEach((item) => {
    addsScore += Cards4[item].value
  })

  let roundScore = 0;

  if (currentRound.round.selectedTeam === team) {
    roundScore += currentRound.round.number;

    if (currentRound.round.isQuanshed) {
      roundScore *= 2;
    } else if (currentRound.round.isSured) {
      roundScore *= 4;
    }
  }

  return roundScore + baseScore + addsScore;
}
