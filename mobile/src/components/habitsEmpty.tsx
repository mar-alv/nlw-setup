import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation()

  function handleNavigateToNew() {
    navigate('new')
  }

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito {''}
      <Text className="text-violet-400 text-base underline active:text-violet-500" onPress={handleNavigateToNew}>
        Comece cadastrando um
      </Text>
    </Text>
  )
}
