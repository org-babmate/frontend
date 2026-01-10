// 'use client';

// import * as React from 'react';
// import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// import { DayPicker, getDefaultClassNames, type DayButton } from 'react-day-picker';
// import { cn } from '@/shared/lib/utils';
// import { Button, buttonVariants } from '@/shared/ui/button';

// function CustomCalendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   captionLayout = 'label',
//   buttonVariant = 'ghost',
//   formatters,
//   components,
//   ...props
// }: React.ComponentProps<typeof DayPicker> & {
//   buttonVariant?: React.ComponentProps<typeof Button>['variant'];
// }) {
//   const defaultClassNames = getDefaultClassNames();

//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn(
//         className,
//         ' w-full h-auto group/calendar p-4 [--cell-size:calc((100%-4px)/7)]',
//       )}
//       captionLayout={captionLayout}
//       formatters={{
//         formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
//         ...formatters,
//       }}
//       classNames={{
//         root: cn(defaultClassNames.root, 'w-fit bg-white h-auto'),
//         months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
//         month: cn('flex flex-col w-full h-fit gap-4', defaultClassNames.month),
//         nav: cn(
//           'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
//           defaultClassNames.nav,
//         ),
//         button_previous: cn(
//           buttonVariants({ variant: buttonVariant }),
//           'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
//           defaultClassNames.button_previous,
//         ),
//         button_next: cn(
//           buttonVariants({ variant: buttonVariant }),
//           'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
//           defaultClassNames.button_next,
//         ),
//         month_caption: cn(
//           'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
//           defaultClassNames.month_caption,
//         ),
//         dropdowns: cn(
//           'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
//           defaultClassNames.dropdowns,
//         ),
//         dropdown_root: cn(
//           'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
//           defaultClassNames.dropdown_root,
//         ),
//         dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
//         caption_label: cn(
//           'select-none font-medium',
//           captionLayout === 'label'
//             ? 'text-sm'
//             : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
//           defaultClassNames.caption_label,
//         ),
//         table: 'w-full border-collapse',

//         // weekdays: cn('flex', defaultClassNames.weekdays),
//         // weekday: cn(
//         //   'text-muted-foreground rounded-full flex-1 font-normal text-[0.8rem] select-none',
//         //   defaultClassNames.weekday,
//         // ),
//         weekdays: cn(
//           'grid grid-cols-[repeat(7,var(--cell-size))] w-full justify-center',
//           defaultClassNames.weekdays,
//         ),
//         weekday: cn(
//           'text-muted-foreground font-normal text-[0.8rem] select-none text-center',
//           defaultClassNames.weekday,
//         ),
//         // week: cn('flex w-full mt-2', defaultClassNames.week),
//         week: cn(
//           'grid grid-cols-[repeat(7,var(--cell-size))] w-full mt-2 justify-center',
//           defaultClassNames.week,
//         ),
//         week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
//         week_number: cn(
//           'text-[0.8rem] select-none text-muted-foreground',
//           defaultClassNames.week_number,
//         ),
//         day: cn(
//           'relative w-full p-0 text-center aspect-square select-none',
//           // range-middle: 셀 전체 배경
//           'data-[range-middle=true]:bg-primary-subtle',

//           // range-start: 셀 오른쪽 절반만 배경(선)
//           'data-[range-start=true]:after:content-[""] data-[range-start=true]:after:absolute data-[range-start=true]:after:inset-y-0 data-[range-start=true]:after:right-0 data-[range-start=true]:after:left-1/2 data-[range-start=true]:after:bg-primary-subtle',

//           // range-end: 셀 왼쪽 절반만 배경(선)
//           'data-[range-end=true]:before:content-[""] data-[range-end=true]:before:absolute data-[range-end=true]:before:inset-y-0 data-[range-end=true]:before:left-0 data-[range-end=true]:before:right-1/2 data-[range-end=true]:before:bg-primary-subtle',

//           // 버튼이 선 위에 올라오게
//           'data-[range-start=true]:after:-z-10 data-[range-end=true]:before:-z-10',
//           defaultClassNames.day,
//         ),

//         range_start: cn('rounded-full bg-primary-normal', defaultClassNames.range_start),
//         range_middle: cn('rounded-none', defaultClassNames.range_middle),
//         range_end: cn('rounded-full bg-primary-normal', defaultClassNames.range_end),
//         today: cn(
//           'bg-accent text-accent-foreground rounded-full data-[selected=true]:rounded-none',
//           defaultClassNames.today,
//         ),
//         outside: cn(
//           'text-muted-foreground aria-selected:text-muted-foreground',
//           defaultClassNames.outside,
//         ),
//         disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
//         hidden: cn('invisible', defaultClassNames.hidden),
//         ...classNames,
//       }}
//       components={{
//         Root: ({ className, rootRef, ...props }) => {
//           return <div data-slot="calendar" ref={rootRef} {...props} className={cn(className)} />;
//         },
//         Chevron: ({ className, orientation, ...props }) => {
//           if (orientation === 'left') {
//             return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
//           }

//           if (orientation === 'right') {
//             return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
//           }

//           return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
//         },
//         DayButton: CalendarDayButton,
//         WeekNumber: ({ children, ...props }) => {
//           return (
//             <td {...props}>
//               <div className="flex size-(--cell-size) items-center justify-center text-center">
//                 {children}
//               </div>
//             </td>
//           );
//         },
//         ...components,
//       }}
//       {...props}
//     />
//   );
// }

// function CalendarDayButton({
//   className,
//   day,
//   modifiers,
//   ...props
// }: React.ComponentProps<typeof DayButton>) {
//   const defaultClassNames = getDefaultClassNames();

//   const ref = React.useRef<HTMLButtonElement>(null);
//   React.useEffect(() => {
//     if (modifiers.focused) ref.current?.focus();
//   }, [modifiers.focused]);

//   return (
//     <Button
//       ref={ref}
//       variant="ghost"
//       size="icon"
//       data-day={day.date.toLocaleDateString()}
//       data-selected-single={
//         modifiers.selected &&
//         !modifiers.range_start &&
//         !modifiers.range_end &&
//         !modifiers.range_middle
//       }
//       data-range-start={modifiers.range_start}
//       data-range-end={modifiers.range_end}
//       data-range-middle={modifiers.range_middle}
//       className={cn(
//         'rounded-full data-[selected-single=true]:bg-primary-normal data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-primary-subtle data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary-normal data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary-normal data-[range-end=true]:text-primary-foreground  dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10  data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none  data-[range-start=true]:rounded-full [&>span]:text-xs [&>span]:opacity-70 p-0 m-0',
//         defaultClassNames.day,
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { CustomCalendar, CalendarDayButton };

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
        'w-full h-auto group/calendar bg-white p-4 [--cell-size:calc((100%-32px)/7)]',
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
        weekdays: cn(
          defaultClassNames.weekdays,
          'grid grid-cols-[repeat(7,var(--cell-size))] w-full  justify-items-center justify-between',
        ),
        weekday: cn(
          defaultClassNames.weekday,
          'text-muted-foreground font-normal text-[0.8rem] select-none text-center  size-(--cell-size)',
        ),

        week: cn(
          defaultClassNames.week,
          'grid grid-cols-[repeat(7,var(--cell-size))] w-full mt-2  justify-items-center justify-between',
        ),

        // ✅ day 셀 자체를 cell-size로 고정 (aspect-square/w-full 제거)
        day: cn(
          defaultClassNames.day,
          'relative size-(--cell-size) text-[0.8rem] p-0 grid place-items-center select-none flex-1 tabular-nums text-center',
          // range-middle: 셀 전체 배경
          'data-[range-middle=true]:bg-primary-subtle',
          // range-start: 오른쪽 절반
          'data-[range-start=true]:after:content-[""] data-[range-start=true]:after:absolute data-[range-start=true]:after:inset-y-0 data-[range-start=true]:after:right-0 data-[range-start=true]:after:left-1/2 data-[range-start=true]:after:bg-primary-subtle',
          // range-end: 왼쪽 절반
          'data-[range-end=true]:before:content-[""] data-[range-end=true]:before:absolute data-[range-end=true]:before:inset-y-0 data-[range-end=true]:before:left-0 data-[range-end=true]:before:right-1/2 data-[range-end=true]:before:bg-primary-subtle',
          // 선이 버튼 아래로
          'data-[range-start=true]:after:-z-10 data-[range-end=true]:before:-z-10',
        ),
        range_start: cn(defaultClassNames.range_start, 'rounded-full bg-primary-normal'),
        range_middle: cn(defaultClassNames.range_middle, 'rounded-none'),
        range_end: cn(defaultClassNames.range_end, 'rounded-full bg-primary-normal'),

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
        'relative tabular-nums z-10 size-(--cell-size) p-0 m-0 rounded-full flex items-center justify-center leading-none',

        // 선택/범위 스타일
        'data-[selected-single=true]:bg-primary-normal data-[selected-single=true]:text-primary-foreground',
        'data-[range-start=true]:bg-primary-normal data-[range-start=true]:text-primary-foreground',
        'data-[range-end=true]:bg-primary-normal data-[range-end=true]:text-primary-foreground',
        'data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-accent-foreground',

        className,
      )}
      {...props}
    />
  );
}

export { CustomCalendar, CalendarDayButton };
