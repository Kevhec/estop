import { Select, Typography, Label } from '@estop/ui';
import { useTranslation } from 'react-i18next';
import USFlag from './icons/USFlag';
import ESFlag from './icons/ESFlag';

export default function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-6">
      <Label htmlFor="language-select">
        <Typography variant="span">{t('settings.language')}</Typography>
      </Label>
      <Select
        defaultValue={i18n.language}
        onValueChange={handleLanguageChange}
      >
        <Select.Trigger id="language-select" className="p-0 py-1 bg-white text-black">
          <Select.Value placeholder={t('settings.language-placeholder')} />
        </Select.Trigger>
        <Select.Content>
          <Select.Option value="es">
            <div className="flex items-center gap-2 p-0.5">
              <ESFlag />
              <Typography variant="span" className="font-medium">Español</Typography>
            </div>
          </Select.Option>
          <Select.Option value="en">
            <div className="flex items-center gap-2 p-0.5">
              <USFlag />
              <Typography variant="span" className="font-medium">English</Typography>
            </div>
          </Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}
