'use client';

import { cn } from '@/shared/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface SharedBottomSheetProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  footerButtonText?: string;
  footerButtonTextClassName?: string;
  onApply?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isSelectDisabled?: boolean;
}

export function SharedBottomSheet({
  trigger,
  title,
  children,
  footerButtonText = 'Select',
  footerButtonTextClassName,
  onApply,
  open,
  onOpenChange,
  isSelectDisabled = false,
}: SharedBottomSheetProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-dvh px-4">
        <DrawerHeader className="flex flex-row justify-between items-center p-0 mt-8 mb-8">
          <DrawerTitle className="text-[14px] font-semibold">{title}</DrawerTitle>
          <DrawerClose asChild>
            <button>
              <X className="h-6 w-6" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">{children}</div>

        <div className={cn('my-8', footerButtonTextClassName)}>
          <button
            onClick={onApply}
            disabled={isSelectDisabled}
            className={`w-full py-4 rounded-xl text-[16px] font-bold ${
              isSelectDisabled ? 'bg-gray-200 text-gray-400' : 'bg-black text-white'
            }`}
          >
            {footerButtonText}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
