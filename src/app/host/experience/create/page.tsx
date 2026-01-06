import Header from '@/shared/ui/header';
import ExperienceSteps from '@/widget/experience-step';

function ExperienceCreatePage() {
  return (
    <>
      <Header />
      <ExperienceSteps isEdit={false} />;
    </>
  );
}

export default ExperienceCreatePage;
