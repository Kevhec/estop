import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import Header from '../components/Header';

export default function MainLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadTranslations = async () => {
      const language = window.localStorage.getItem('lang');

      if (language) {
        i18n.changeLanguage(language)
      }
    }

    loadTranslations();
  }, [i18n])

  return (
    <>
      <div
        className='fixed w-[500%] h-[500%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[url(/background-pattern.svg)] bg-center animate-full-rotation bg-no-repeat bg-size-[200%]'
        tabIndex={0}
      />
      <div className='min-h-screen relative z-10'>
        <Header />
        <Outlet />
      </div>
    </>
  )
}