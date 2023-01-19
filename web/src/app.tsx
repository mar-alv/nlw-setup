import './styles/global.css'
import { Habit } from './components/habit'

export function App() {
  return (
    <div className="app">
      {[1, 2, 3].map((index) => <Habit key={index} />)}
    </div>
  )
}
