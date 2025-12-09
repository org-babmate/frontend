import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropDownRadioProps {
  defaultValue: string;
  values: string[];
}

function CustomDropDownRadio({ values, defaultValue = '' }: DropDownRadioProps) {
  const [value, setValue] = useState<string>(defaultValue);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 group">
          {value}
          <ChevronDown
            className="
              h-4 w-4
              transition-transform duration-200
              group-data-[state=open]:rotate-180
            "
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          {values.map((value, index) => (
            <DropdownMenuRadioItem value={value} key={index}>
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropDownRadio;
