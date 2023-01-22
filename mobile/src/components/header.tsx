import Logo from '../assets/logo.svg'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, View, TouchableOpacity } from 'react-native'

export function Header() {
  const { navigate } = useNavigation()

  function handleOnNavigateToNewPage() {
    navigate('new')
  }

  return (
    <View className='w-full flex-row items-center justify-between'>
      <Logo />
      <TouchableOpacity
        className='flex-row h-11 px-4 border border-violet-500 rounded-lg items-center'
        activeOpacity={0.7}
        onPress={handleOnNavigateToNewPage}
      >
        <Feather
          size={20}
          name='plus'
          color={colors.violet[500]}
        />
        <Text className='text-white ml-3 font-semibold text-base'>
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  )
}
