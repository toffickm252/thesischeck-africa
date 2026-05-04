import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadScreen from './components/UploadScreen'
import ResultsScreen from './components/ResultsScreen'
import ProcessingScreen from './components/ProcessingScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [results, setResults] = useState(null)

  const handleResults = (data) => {
    setResults(data)
    setCurrentScreen('results')
  }

  return (
    <div>
      <Navbar />
      {currentScreen === 'landing' && (
        <LandingPage onStart={() => setCurrentScreen('upload')} />
      )}
      {currentScreen === 'upload' && (
        <UploadScreen onResults={handleResults} onSetScreen={setCurrentScreen} />
      )}
      {currentScreen === 'results' && (
        <ResultsScreen chapters={results} />
      )}
      {currentScreen === 'processing' && <ProcessingScreen />}
    </div>
  )
}

export default App