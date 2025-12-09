import CustomCard from '@/shared/ui/card';
import Link from 'next/link';

function FindMateSection() {
  return (
    <section className="mt-7 flex flex-col gap-5 justify-center">
      <h1 className="text-headline-lg">Find your Babmate</h1>
      <div className="flex flex-col gap-5">
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
        <CustomCard name={'minsu'} description={''} quotes={''} image={'/a.jpg'} />
      </div>
      <div className="w-full flex justify-center">
        <Link href={'/explore'} className="underline underline-offset-2">
          See all Babmates
        </Link>
      </div>
    </section>
  );
}

export default FindMateSection;
