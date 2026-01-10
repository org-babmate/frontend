'use client';

import * as React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayPicker, getDefaultClassNames, type DayButton } from 'react-day-picker';
import { cn } from '@/shared/lib/utils';
import { Button, buttonVariants } from '@/shared/ui/button';

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        // ✅ p-4면 좌우 32px이므로 32px 빼고 7등분
        'w-full h-auto group/calendar bg-white p-4 [--cell-size:calc((100%-16px)/7)]',
        className,
      )}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        // ✅ 부모에 맞추려면 root도 w-full
        root: cn(defaultClassNames.root, 'w-full h-auto tabular-nums'),

        months: cn(defaultClassNames.months, 'w-full flex flex-col gap-4 relative'),
        month: cn(defaultClassNames.month, 'w-full flex flex-col gap-4'),

        nav: cn(
          defaultClassNames.nav,
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          defaultClassNames.month_caption,
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
        ),

        dropdowns: cn(
          defaultClassNames.dropdowns,
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
        ),

        dropdown_root: cn(
          defaultClassNames.dropdown_root,
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
        ),
        dropdown: cn(defaultClassNames.dropdown, 'absolute bg-popover inset-0 opacity-0'),

        caption_label: cn(
          defaultClassNames.caption_label,
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
        ),

        // ✅ weekdays/week을 cell-size 기준으로 정확히 맞춤
        weekdays: cn(defaultClassNames.weekdays, 'grid grid-cols-7 w-full  justify-items-center '),
        weekday: cn(
          defaultClassNames.weekday,
          'text-muted-foreground font-normal text-[0.8rem] select-none text-center  size-(--cell-size)',
        ),

        week: cn(defaultClassNames.week, 'grid grid-cols-7 w-full mt-2  justify-center'),
        month_grid: 'flex flex-col w-full ',
        // ✅ day 셀 자체를 cell-size로 고정 (aspect-square/w-full 제거)
        day: cn(
          'relative z-10 w-full text-[0.8rem] p-0 flex place-items-center select-none tabular-nums text-center',
          defaultClassNames.day,
        ),
        day_button: cn(
          'size-full data-[selected-single=true]:bg-primary-normal data-[selected-single=true]:text-white data-[selected-single=true]:rounded-full',
          // middle
          'data-[range-middle=true]:bg-primary-subtle',
          'data-[range-middle=true]:rounded-none',

          // start (right half)
          // 'data-[range-start=true]:after:content-[" "]',
          // 'data-[range-start=true]:after:absolute',
          // 'data-[range-start=true]:after:inset-y-0',
          // 'data-[range-start=true]:after:left-6/10',
          // 'data-[range-start=true]:after:right-0',
          // 'data-[range-start=true]:after:bg-primary-subtle',
          // 'data-[range-start=true]:after:-z-30',

          // end (left half)
          // 'data-[range-end=true]:before:content-[" "]',
          // 'data-[range-end=true]:before:absolute',
          // 'data-[range-end=true]:before:inset-y-0',
          // 'data-[range-end=true]:before:left-0',
          // 'data-[range-end=true]:before:right-1/2',
          // 'data-[range-end=true]:before:bg-primary-normal',
          // 'data-[range-end=true]:before:z-0',
          defaultClassNames.day_button,
        ),

        range_start: cn('rounded-l-full', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-full', defaultClassNames.range_end),
        today: cn(
          defaultClassNames.today,
          'bg-accent text-accent-foreground rounded-full data-[selected=true]:rounded-none',
        ),

        outside: cn(
          defaultClassNames.outside,
          'text-muted-foreground aria-selected:text-muted-foreground',
        ),
        disabled: cn(defaultClassNames.disabled, 'text-muted-foreground opacity-50'),
        hidden: cn(defaultClassNames.hidden, 'invisible'),

        ...classNames,
      }}
      components={{
        // ✅ props/className 덮어쓰기 방지
        Root: ({ className, rootRef, ...p }) => (
          <div data-slot="calendar" ref={rootRef} {...p} className={cn(className)} />
        ),
        Chevron: ({ className, orientation, ...p }) => {
          if (orientation === 'left')
            return <ChevronLeftIcon className={cn('size-4', className)} {...p} />;
          if (orientation === 'right')
            return <ChevronRightIcon className={cn('size-4', className)} {...p} />;
          return <ChevronDownIcon className={cn('size-4', className)} {...p} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // ✅ 셀 깨는 옵션 전부 제거. 딱 cell-size로 고정 + 중앙정렬
        'relative tabular-nums z-20 size-full p-3 m-0  flex items-center justify-center leading-none',

        // 선택/범위 스타일
        'data-[selected-single=true]:bg-primary-normal data-[selected-single=true]:text-white',
        'data-[range-start=true]:bg-primary-normal data-[range-start=true]:text-white data-[range-start=true]:rounded-l-full',
        'data-[range-end=true]:bg-primary-normal data-[range-end=true]:text-white  data-[range-end=true]:rounded-r-full',
        'data-[range-middle=true]:bg-primary-subtle data-[range-middle=true]:text-primary-normal',
        className,
      )}
      {...props}
    />
  );
}

export { CustomCalendar, CalendarDayButton };
