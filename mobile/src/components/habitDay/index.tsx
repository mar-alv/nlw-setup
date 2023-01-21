import { DAY_SIZE } from "../../constants";
import { TouchableOpacity } from "react-native";

export function HabitDay() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
    />
  )
}
