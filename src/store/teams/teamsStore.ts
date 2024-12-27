import { ITeamsStore } from '@/interfaces/ITeams';
import { create } from 'zustand';

const useTeamsStore = create<ITeamsStore>((set) => ({
	selectedTeam: { team_id: 0, name: '' },
	setSelectedTeam: (newSelectedTeam) => set({ selectedTeam: newSelectedTeam }),
}));

export { useTeamsStore };
