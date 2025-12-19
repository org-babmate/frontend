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
        'rounded-xl flex px-3 py-2.5 w-fit whitespace-nowrap bg-gray-50 text-badge text-gray-500 cursor-pointer',
        selected && 'bg-black text-white',
        className,
      )}
      onClick={onClick}
    >
      {content}
    </div>
  );
}

export default Badge;
