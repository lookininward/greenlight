import './App.css'
import DriveContainer from './components/DriveContainer';
import { AuthProvider } from './context/auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <DriveContainer />
    </AuthProvider>
  )
}

export default App
