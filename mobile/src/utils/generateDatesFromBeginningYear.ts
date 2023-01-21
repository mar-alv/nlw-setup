import dayjs from 'dayjs'

export function generateDatesFromBeginningYear() {
  const firstDayOfTheYear = dayjs().startOf('year')

  let compareDate = firstDayOfTheYear

  const today = new Date()

  const dates = []

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())

    compareDate = compareDate.add(1, 'day')
  }

  return dates
}
