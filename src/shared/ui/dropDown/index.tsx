import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface DropDownRadioProps<T extends string> {
  values: readonly T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  getLabel?: (value: T) => ReactNode;
}

function CustomDropDownRadio<T extends string>({
  values,
  value,
  onChange,
  className,
  getLabel = (v) => v,
}: DropDownRadioProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('flex items-center gap-1 group', className)}>
          {value}
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={value} onValueChange={(next) => onChange(next as T)}>
          {values.map((v) => (
            <DropdownMenuRadioItem value={v} key={v}>
              {getLabel(v)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropDownRadio;
