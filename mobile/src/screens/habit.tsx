import clsx from 'clsx'
import dayjs from 'dayjs'
import { api } from '../lib/axios'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View, ScrollView, Alert } from 'react-native'
import { generateProgressPercentage } from '../utils/generateProgressPercentage'
import { BackButton, Checkbox, HabitsEmpty, Loading, ProgressBar } from '../components'

interface Params {
  date: string
}

interface Habit {
  id: string
  title: string

}

interface DayInfo {
  possibleHabits: Habit[]
  completedHabits: string[]
}

export function Habit() {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfo | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const isDateInThePast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfTheWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
    : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date } })

      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    }
    catch (error) {
      Alert.alert('Oops', 'Não foi possível carregar as informações dos hábitos')
    }
    finally {
      setLoading(false)
    }
  }

  async function handleToogleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`)

      if (completedHabits.includes(habitId)) {
        setCompletedHabits(completedHabits.filter(completedHabit => completedHabit !== habitId))
      }
      else {
        setCompletedHabits([...completedHabits, habitId])
      }
    }
    catch (error) {
      Alert.alert('Oops', 'Não foi possível atualizar o status hábito')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) return <Loading />

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
        <ProgressBar progress={habitsProgress} />
        <View className={clsx('mt-6', {
          'opacity-50': isDateInThePast
        })}>
          {dayInfo?.possibleHabits ? (dayInfo.possibleHabits.map(possibleHabit => {
            const { id, title } = possibleHabit

            return (
              <Checkbox
                key={id}
                title={title}
                disabled={isDateInThePast}
                onPress={() => handleToogleHabit(id)}
                checked={completedHabits.includes(id)}
              />
            )
          })) : (
            <HabitsEmpty />
          )}
        </View>
        {
          isDateInThePast && (
            <Text className='text-white mt-10 text-center'>
              Você não pode editar hábitos de uma data passada.
            </Text>
          )
        }
      </ScrollView >
    </View >
  )
}
