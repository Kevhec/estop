import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

type Event = 'join-room';

interface SocketState {
  socket: Socket | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
  emit: <T>(event: Event, data: T) => void
}

const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: () => {
    const { socket } = get();
    if (socket) return;

    const socketInstance = io(import.meta.env.VITE_API_URL || undefined);

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      set({ socket: socketInstance, isConnected: true });
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      set({ isConnected: false });
    });

    set({ socket: socketInstance });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, isConnected: false });
    }
  },

  emit: (event, data) => {
    const { socket } = get();
    if (socket) {
      socket.emit(event, data);
    }
  },
}));

export default useSocketStore;
