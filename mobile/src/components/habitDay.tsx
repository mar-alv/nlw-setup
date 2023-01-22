import { DAY_SIZE } from '../constants'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps { }

export function HabitDay({ ...rest }: Props) {
  return (
    <TouchableOpacity
      className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
      activeOpacity={0.7}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    />
  )
}
