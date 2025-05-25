import { HeroSpinner } from '@/components/hero-components';

export default async function TopicNotFoundPage() {
  return (
    <div className='flex-1 w-full h-screen flex flex-row items-center justify-center gap-4'>
      <HeroSpinner label='wave' variant='wave' size='lg' />
    </div>
  );
}
