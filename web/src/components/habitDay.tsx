import { ProgressBar } from '.'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'

interface Props {
  amount: number
  completed: number
}

export function HabitDay({ amount, completed }: Props) {
  const completedPercentege = Math.round((completed / amount) * 100)

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx(
        'w-10 h-10 border-2 rounded-lg', {
        'bg-zinc-900 border-zinc-800': completedPercentege === 0,
        'bg-violet-900 border-violet-700': completedPercentege >= 0 && completedPercentege < 20,
        'bg-violet-800 border-violet-600': completedPercentege >= 20 && completedPercentege < 40,
        'bg-violet-700 border-violet-500': completedPercentege >= 40 && completedPercentege < 60,
        'bg-violet-600 border-violet-500': completedPercentege >= 60 && completedPercentege < 80,
        'bg-violet-500 border-violet-400': completedPercentege >= 80,
      })}
      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl border-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>terça-feira</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>
          <ProgressBar progress={completedPercentege} />
          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}