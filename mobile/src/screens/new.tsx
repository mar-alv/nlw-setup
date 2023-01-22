import { useState } from 'react'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { Checkbox, BackButton } from '../components'
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(state => state.filter(weekDay => weekDay !== weekDayIndex))
    }
    else {
      setWeekDays([...weekDays, weekDayIndex])
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar hábito
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          Qual seu compromentimento?
        </Text>
        <TextInput
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
          placeholderTextColor={colors.zinc[400]}
          placeholder='Exercícios, dormir bem, etc...'
        />
        <Text className='font-semibold mt-4 mb-3 text-white text-base'>
          Qual a recorrência?
        </Text>
        {availableWeekDays.map((availableWeekDay, index) => {
          return (
            <Checkbox
              key={availableWeekDay}
              title={availableWeekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          )
        })}
        <TouchableOpacity className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6' activeOpacity={0.7}>
          <Feather
            size={20}
            name='check'
            color={colors.white}
          />
          <Text className='font-semibold text-base text-white ml-2'></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
