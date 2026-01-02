import { getGuestExperience } from '@/entities/experiences/model/guest-api';
import { ExperienceDetail } from '@/entities/experiences/model/types';
import { useQuery } from '@tanstack/react-query';

export function useGuestExperienceDetailtQuery(
  id: string,
  onSuccess?: (data: ExperienceDetail) => void,
) {
  return useQuery({
    queryKey: ['guestExperience'],
    queryFn: () => getGuestExperience(id),
  });
}
