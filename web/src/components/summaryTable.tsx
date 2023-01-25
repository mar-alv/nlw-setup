import { HabitDay } from '.'
import { useEffect, useState } from 'react'
import { generateDatesFromBeginningYear } from '../utils/generateDatesFromBeginningYear'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromBeginningYear()

const minimumSummaryDatesSize = 18 * 7

const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

interface Summary {
  id: string
  date: string
  amount: number
  completed: number
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    api.get('/summary').then((response) => setSummary(response.data))
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map(summaryDate => {
          const dayInSummary = summary.find(day => {
            return dayjs(summaryDate).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              date={summaryDate}
              key={summaryDate.toString()}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) =>
          <div key={i} className='w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed' />
        )}
      </div>
    </div>
  )
}
