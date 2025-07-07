import { Dialog } from '@estop/ui';
import { useTranslation } from 'react-i18next';
import useDialogsStore from '@/stores/dialogsStore';

interface Props {
  trigger?: React.ReactNode
}

export default function CreateRoomDialog({ trigger }: Props) {
  const { t } = useTranslation();
  const { createRoomOpen, onCreateRoomOpen } = useDialogsStore();

  return (
    <Dialog open={createRoomOpen} onOpenChange={onCreateRoomOpen}>
      {trigger && (
        <Dialog.Trigger className="aspect-square w-14 flex items-center justify-center p-0">
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Content className="min-h-96">
          <Dialog.Title className="mb-4">
            {t('settings.label')}
          </Dialog.Title>
          <form />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
