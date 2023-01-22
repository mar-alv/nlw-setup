import { DAY_SIZE } from '../constants'
import { Header, HabitDay } from '../components'
import { Text, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { generateDatesFromBeginningYear } from '../utils/generateDatesFromBeginningYear'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const minimumSummaryDatesSize = 18 * 7
const datesFromYearStart = generateDatesFromBeginningYear()
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

export function Home() {
  const { navigate } = useNavigation()

  function handleOnNavigateToHabit(date: Date) {
    navigate('habit', { date: date.toISOString() })
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, i) => {
          return (
            <Text
              key={`${weekDay}-${i}`}
              style={{ width: DAY_SIZE }}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
            >
              {weekDay}
            </Text>
          )
        })}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='flex-row flex-wrap'>
          {datesFromYearStart.map(date => {
            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => handleOnNavigateToHabit(date)}
              />
            )
          })}
          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <View
                key={i}
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
