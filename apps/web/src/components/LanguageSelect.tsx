import { Select, Typography, Label } from '@estop/ui';
import { useTranslation } from 'react-i18next';

export default function LanguageSelect() {
  const { t } = useTranslation();

  return (
    <div className='grid grid-cols-[1fr_2fr] items-center gap-6'>
      <Label htmlFor='language-select'>
        <Typography variant='span'>{t('settings.language')}</Typography>
      </Label>
      <Select>
        <Select.Trigger id='language-select' className='p-0 py-1 bg-white text-black'>
          <Select.Value placeholder={t('settings.language-placeholder')} />
        </Select.Trigger>
        <Select.Content>
          <Select.Option value={'es'}>Español</Select.Option>
          <Select.Option value={'en'}>English</Select.Option>
        </Select.Content>
      </Select>
    </div>
  )
}