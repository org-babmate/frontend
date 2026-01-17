import { cn } from '@/shared/lib/utils';

interface BadgeProps {
  selected?: boolean;
  content: string;
  onClick?: () => void;
  className?: string;
}

function Badge({ selected, content, onClick, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'rounded-xl flex px-3 py-2 w-fit whitespace-nowrap text-center items-center bg-white ring-1 ring-gray-200 text-label-subtle ty-label-1-medium cursor-pointer',
        selected && 'bg-primary-normal text-white',
        className,
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
}

export default Badge;
