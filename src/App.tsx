import './App.css'
import DriveContainer from './components/DriveContainer';
import { AuthProvider } from './context/auth/AuthProvider'
import { DriveProvider } from './context/drive/DriveProvider';

function App() {
  return (
    <AuthProvider>
      <DriveProvider>
        <DriveContainer />
      </DriveProvider>
    </AuthProvider>
  )
}

export default App
