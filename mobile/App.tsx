import './src/lib/dayjs'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'
import { Routes } from './src/routes'
import { Loading } from './src/components'
import { StatusBar, Button } from 'react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldPlaySound: false
  })
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  async function scheduleNotification() {
    const trigger = new Date(Date.now())

    trigger.setMinutes(trigger.getMinutes() + 1)
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Olá, você!',
        body: 'Você praticou seus hábitos hoje?'
      },
      trigger
    })
  }

  async function getScheduledNotification() {
    const schedules = await Notifications.getAllScheduledNotificationsAsync()
  }

  if (!fontsLoaded) return <Loading />

  return (
    <>
      <Routes />
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
    </>
  )
}
