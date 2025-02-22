import Profile from '@/app/components/profile/Profile'
import { useTranslations } from 'next-intl';
export default function Home() {
  const t =useTranslations("Profile")
  return (
    <main className="">
      <h1 className='pageTitle'> {t("profile")}</h1>
      <Profile/>
    </main>
  );
}
