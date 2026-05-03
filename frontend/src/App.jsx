import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadScreen from './components/UploadScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')

  return (
    <div>
      <Navbar />
      {currentScreen === 'landing' && (
        <LandingPage onStart={() => setCurrentScreen('upload')} />
      )}
      {currentScreen === 'upload' && (
        <UploadScreen />
      )}
    </div>
  )
}

export default App