import { roomSchema, type RoomSchemaType } from '@/lib/schemas/game/roomSchemas';
import useDialogsStore from '@/stores/dialogsStore';
import useGameStore from '@/stores/gameStore';
import usePlayerStore from '@/stores/playerStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import verifyRoom from '@/lib/utils/game/verifyRoom';
import { Button, Input, Typography } from '@estop/ui';
import { ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import useSocketStore from '@/stores/socketStore';
import { type JoinRoomData, type PendingAction } from '@/types/game';
import CreateRoomDialog from '@/components/dialogs/CreateRoomDialog';

export default function Home() {
  const { data: playerData } = usePlayerStore();
  const {
    playerDataOpen, createRoomOpen, onPlayerDataOpen, onCreateRoomOpen,
  } = useDialogsStore();
  const {
    pendingAction, room, setRoomId, setPendingAction,
  } = useGameStore();
  const { isConnected, connect, emit } = useSocketStore();
  const { register, handleSubmit } = useForm<RoomSchemaType>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      id: undefined,
    },
  });
  const { t } = useTranslation();

  const handleNewGame = () => {
    if (!playerData) {
      setPendingAction('new');
      onPlayerDataOpen(true);
      return;
    }

    onCreateRoomOpen(true);
  };

  const handleJoinGame = useCallback(async (action: PendingAction) => {
    if (!playerData) {
      onPlayerDataOpen(true);
      return;
    }

    if (action === 'new' && !room.id) {
      onCreateRoomOpen(true);
      return;
    }

    setPendingAction(null);
    connect();
  }, [
    playerData,
    room.id,
    setPendingAction,
    connect,
    onCreateRoomOpen,
    onPlayerDataOpen,
  ]);

  const handleJoinForm = async (data: RoomSchemaType) => {
    const { id } = data;

    const isRoomValid = await verifyRoom(id);

    // TODO: UI Component to show errors
    console.log("Invalid room code or room doesn't exists");
    if (!isRoomValid) return;

    setRoomId(id);
    setPendingAction('join');
  };

  // This effect finishes pending actions
  useEffect(() => {
    if (pendingAction) {
      if (!createRoomOpen && !playerDataOpen) {
        setPendingAction(null);
      } else {
        handleJoinGame(pendingAction);
      }
    }

    // Cleanup pending action on component unmount
    return () => {
      setPendingAction(null);
    };
  }, [
    createRoomOpen,
    playerDataOpen,
    pendingAction,
    handleJoinGame,
    setPendingAction,
  ]);

  // This effect joins player to game room when possible
  useEffect(() => {
    if (!isConnected || !room.id || !playerData) return;

    emit<JoinRoomData>('join-room', {
      roomId: room.id,
      participant: playerData,
    });
  }, [isConnected, room.id, playerData, emit]);

  return (
    <div className="h-screen px-4 flex gap-4 items-center justify-center flex-col">
      <img src="/logo.png" alt="Estop logo" width={200} />
      <main className="w-10/12">
        <Button className="mb-6" onClick={handleNewGame}>
          {t('home.new-game')}
        </Button>
        <form
          className="flex gap-1"
          onSubmit={handleSubmit(handleJoinForm)}
        >
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('id')}
            className="grow py-3 focus:outline-none placeholder:text-center"
            placeholder={t('home.room-code')}
          />
          <Button
            type="submit"
            className="p-2 w-min flex items-center justify-center aspect-square"
            disabled={pendingAction !== null}
          >
            <Typography className="sr-only">{t('player-info.continue')}</Typography>
            <ChevronRight size={30} strokeWidth={3} />
          </Button>
        </form>
      </main>
      <CreateRoomDialog />
    </div>
  );
}
