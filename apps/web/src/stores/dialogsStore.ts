import { create } from 'zustand';

interface DialogsState {
  playerDataOpen: boolean
  createRoomOpen: boolean
}

interface DialogsActions {
  onPlayerDataOpen: (newOpen: boolean) => void
  onCreateRoomOpen: (newOpen: boolean) => void
}

const useDialogsStore = create<DialogsState & DialogsActions>((set) => ({
  playerDataOpen: false,
  createRoomOpen: false,
  onPlayerDataOpen: (newOpen) => {
    set({ playerDataOpen: newOpen });
  },
  onCreateRoomOpen: (newOpen) => {
    set({ createRoomOpen: newOpen });
  },
}));

export default useDialogsStore;
