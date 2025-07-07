import { create } from 'zustand';
import type { RoomSchemaType } from '@/lib/schemas/game/roomSchemas';
import type { ParticipantType } from '@/lib/schemas/game/ParticipantSchemas';
import type { PendingAction } from '@/types/game';
import useSocketStore from './socketStore';

interface GameState {
  room: RoomSchemaType
  gameStarted: boolean
  pendingAction: PendingAction
}

interface GameActions {
  joinRoom: (payload: JoinRoomPayload) => void
  joinedParticipant: (participant: ParticipantType) => void
  setPendingAction: (action: PendingAction) => void
  setRoomId: (newRoomId: string) => void
}

interface JoinRoomPayload {
  roomId: string
  participant: ParticipantType
}

const useGameStore = create<GameState & GameActions>((set, get) => ({
  room: {
    id: '',
    participants: [],
    participantsCount: 0,
  },
  gameStarted: false,
  pendingAction: null,

  joinRoom: (payload: JoinRoomPayload) => {
    const { emit } = useSocketStore.getState();

    // Emit joining event
    emit('join-room', payload);

    // Call function to update participants state
    get().joinedParticipant(payload.participant);
  },

  joinedParticipant: (participant) => set((state) => ({
    room: {
      ...state.room,
      participants: [...state.room.participants, participant],
    },
  })),

  setPendingAction: (action) => set({ pendingAction: action }),

  setRoomId: (newRoomId) => set((state) => ({
    room: {
      ...state.room,
      id: newRoomId,
    },
  })),
}));

export default useGameStore;
