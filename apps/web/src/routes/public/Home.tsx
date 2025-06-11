import { useTranslation } from 'react-i18next';
import { Button, Input } from '@estop/ui';
import { ChevronRight } from 'lucide-react';
import type { FormEvent } from 'react';


export default function Home() {
  const { t } = useTranslation();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) =>  {
    evt.preventDefault();
    const form = evt.currentTarget;

    const formData = Object.fromEntries(new FormData(form));

    console.log(formData)
  }

  return (
    <div className='h-screen px-4 flex gap-4 items-center justify-center flex-col'>
      <img src="/logo.png" alt="Estop logo" width={200} />
      <main className='w-10/12'>
        <Button className='mb-6'>
          {t('home.new-game')}
        </Button>
        <form className='flex gap-1' onSubmit={handleSubmit}>
          <Input name='roomCode' className='grow py-3 focus:outline-none' placeholder={t('home.room-code')} />
          <Button className='aspect-square w-14 flex items-center justify-center p-0' type='submit'>
            <ChevronRight size={30} strokeWidth={3} />
          </Button>
        </form>
      </main>
    </div>
  )
}