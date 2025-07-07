import type { ParticipantType } from '@/lib/schemas/game/ParticipantSchemas';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  data: ParticipantType | null
}

interface PlayerActions {
  setData: (data: ParticipantType) => void
}

const usePlayerStore = create<PlayerState & PlayerActions>()(
  persist(
    (set) => ({
      data: null,
      setData: (data: ParticipantType) => set({ data }),
    }),
    { name: 'player-data' },
  ),
);

export default usePlayerStore;
