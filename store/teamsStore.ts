import { create } from 'zustand';

interface Team {
  id: string;
  name: string;
}

interface TeamsState {
  team1: Team;
  team2: Team;
  setTeam1Name: (name: string) => void;
  setTeam2Name: (name: string) => void;
  resetTeams: () => void;
}

const defaultTeams = {
  team1: { id: 'team1', name: 'Team 1' },
  team2: { id: 'team2', name: 'Team 2' },
};

export const useTeamsStore = create<TeamsState>((set) => ({
  team1: defaultTeams.team1,
  team2: defaultTeams.team2,
  
  setTeam1Name: (name: string) => 
    set((state) => ({ 
      team1: { ...state.team1, name: name.slice(0, 10) } 
    })),
  
  setTeam2Name: (name: string) => 
    set((state) => ({ 
      team2: { ...state.team2, name: name.slice(0, 10) } 
    })),
  
  resetTeams: () => set(defaultTeams),
}));
