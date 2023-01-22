import dayjs from 'dayjs'
import { BackButton, Checkbox, ProgressBar } from '../components'
import { useRoute } from '@react-navigation/native'
import { Text, View, ScrollView } from 'react-native'

interface Params {
  date: string
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfTheWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfTheWeek}
        </Text>
        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>
        <ProgressBar progress={30} />
        <View className='mt-6'>
          <Checkbox
            checked={false}
            title='Beber 2L de água'
          />
          <Checkbox
            checked={true}
            title='Caminhar'
          />
        </View>
      </ScrollView>
    </View>
  )
}