import { Score } from "@/app/score";
import { TeamData } from "@/components/custom/finish-game-modal";
import { AddKey, Adds } from "@/constants/values";

function calculateAdds(teamData: TeamData) {
  const addKeys = Object.keys(teamData.adds) as AddKey[];

  let addsScore = 0;
  addKeys.forEach(addKey => {
    addsScore += Adds[addKey].value * (teamData?.adds[addKey] ?? 1)
  })
  addsScore += Number(teamData.cards4);

  return addsScore;
}

function getScore(teams: TeamData[], currentRound: Score, spokenScore: number) {
  let multiplier = 1;
  if (currentRound.round.isQuanshed) multiplier = 2;
  else if (currentRound.round.isSured) multiplier = 4;

  const spokeTeam = teams[0];
  const opponentTeam = teams[1];

  const spokeTeamAdds = calculateAdds(spokeTeam);
  const opponentTeamAdds = calculateAdds(opponentTeam);

  const spokeTeamScore = Number(spokeTeam.score);
  const opponentTeamScore = Number(opponentTeam.score);

  // HANDLING TAK
  if (spokeTeamScore + spokeTeamAdds < currentRound.round.number) {
    const adder = opponentTeamScore === 16 ? 25 : 16;
    const finalScore = (multiplier * spokenScore) + adder + spokeTeamAdds;
    return [0, finalScore]
  }

  // HANDLING HANEL

  // IF QUANSHED OR SURED
  if (multiplier > 1) {
    let adder = (spokeTeamScore === 16) ? 25 : 16;
    const teamScore = (multiplier * spokenScore) + adder + spokeTeamAdds;
    return [teamScore, 0];
  }

  // Handling simple case
  let adder = spokeTeamScore === 16 ? 25 : spokeTeamScore;
  const spokeTeamFinalScore = adder + spokenScore + spokeTeamAdds;
  const opponentFinalScore = opponentTeamScore + opponentTeamAdds;

  return [spokeTeamFinalScore, opponentFinalScore]
}

export function calculateStore(team1Data: TeamData, team2Data: TeamData, currentRound: Score, isAX2Selected: boolean): number[] {
  const spokeTeam = currentRound.round.selectedTeam;

  let spokenScore = currentRound.round.number;
  if (currentRound.round.suit === "ace" && isAX2Selected) spokenScore *= 2;

  if (spokeTeam === "team1") {
    const [team1Score, team2Score] = getScore([team1Data, team2Data], currentRound, spokenScore);
    return [team1Score, team2Score];
  } else {
    const [team2Score, team1Score] = getScore([team2Data, team1Data], currentRound, spokenScore);
    return [team1Score, team2Score];
  }
}
