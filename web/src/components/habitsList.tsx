import { api } from '../lib/axios'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'

interface Props {
  date: Date
  onCompletedChange: (completed: number) => void
}

interface Habit {
  id: string
  title: string
  created_at: string
}

interface HabitsInfo {
  possibleHabits: Habit[]
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChange }: Props) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null)

  const isDateInThePast = dayjs(date).endOf('day').isBefore(new Date())

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then(response => setHabitsInfo(response.data)
    )
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    }
    else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({ possibleHabits: habitsInfo!.possibleHabits, completedHabits })

    onCompletedChange(completedHabits.length)
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(possibleHabit => {
        const { id, title } = possibleHabit
        const isChecked = habitsInfo.completedHabits.includes(id)

        'focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'


        return (
          <Checkbox.Root
            key={id}
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
            checked={isChecked}
            disabled={isDateInThePast}
            onCheckedChange={() => handleToggleHabit(id)}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {title}
            </span>
          </Checkbox.Root>
        )
      })}
    </div>
  )
}
