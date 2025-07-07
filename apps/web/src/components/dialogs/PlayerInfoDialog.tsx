import {
  Button, Dialog, Input, Label, Typography,
} from '@estop/ui';
import { useTranslation } from 'react-i18next';
import usePlayerStore from '@/stores/playerStore';
import useDialogsStore from '@/stores/dialogsStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { participantSchema, type ParticipantType } from '@/lib/schemas/game/ParticipantSchemas';

interface Props {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function PlayerInfoDialog({ trigger, open, onOpenChange }: Props) {
  const { t } = useTranslation();
  const { setData } = usePlayerStore();
  const { onPlayerDataOpen } = useDialogsStore();
  const { register, handleSubmit } = useForm<ParticipantType>({
    resolver: zodResolver(participantSchema),
    defaultValues: {
      username: undefined,
    },
  });

  const handlePlayerData = (data: ParticipantType) => {
    const { username } = data;

    setData({
      id: crypto.randomUUID(),
      username: username.toString(),
      ready: false,
    });

    onPlayerDataOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Dialog.Trigger className="aspect-square w-14 flex items-center justify-center p-0">
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Content className="pb-4.5">
          <Dialog.Title className="text-center font-bold mb-1.5">{t('player-info.title')}</Dialog.Title>
          <div>
            <form onSubmit={handleSubmit(handlePlayerData)}>
              <Label>
                <Typography variant="span" className="font-bold text-lg">
                  {t('player-info.username')}
                </Typography>
                <Input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('username')}
                  type="text"
                  className="w-full mt-1.5 text-black"
                  placeholder="Mon"
                  autoComplete="username"
                />
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="mt-8 text-sm select-none bg-coral"
                  onClick={() => onPlayerDataOpen(false)}
                >
                  {t('player-info.goBack')}
                </Button>
                <Button type="submit" className="bg-teal mt-8 text-sm select-none">
                  {t('player-info.continue')}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
