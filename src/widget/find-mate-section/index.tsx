import { cn } from '@/shared/lib/utils';
import CustomCard from '@/shared/ui/card';
import Link from 'next/link';

function FindMateSection({ className }: { className?: string }) {
  return (
    <section className={cn('mt-7 flex flex-col gap-5 justify-center', className)}>
      <h1 className="text-headline-lg">Find your Babmate</h1>
      <div className="flex flex-col gap-5">
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
      </div>
    </section>
  );
}

export default FindMateSection;
