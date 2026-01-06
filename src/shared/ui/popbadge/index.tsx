import { cn } from '@/shared/lib/utils';

interface BadgeProps {
  selected?: boolean;
  content: string;
  onClick?: () => void;
  className?: string;
}

function PopBadge({ selected, content, onClick, className }: BadgeProps) {
  return (
    <div
      // className={cn(
      //   'rounded-lg flex p-1 w-fit whitespace-nowrap bg-gray-100 text-label-2-semibold text-label-subtle cursor-pointer ',
      //   selected && 'bg-primary-normal text-white',
      // )}
      className="rounded-lg flex p-1 w-fit whitespace-nowrap bg-gray-100 text-label-2-semibold text-label-subtle cursor-pointer "
      onClick={onClick}
    >
      {content}
    </div>
  );
}

export default PopBadge;
