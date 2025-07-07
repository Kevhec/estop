import { Dialog, Typography } from '@estop/ui';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './LanguageSelect';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed p-4 right-0">
      <Dialog>
        <Dialog.Trigger>
          <Settings size={30} strokeWidth={2.5} />
          <Typography variant="span" className="sr-only">
            {t('settings.label')}
          </Typography>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="min-h-96">
            <Dialog.Title className="mb-4">{t('settings.label')}</Dialog.Title>
            <div>
              <LanguageSelect />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </header>
  );
}
