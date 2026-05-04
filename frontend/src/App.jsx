import { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import UploadScreen from './components/UploadScreen'
import ResultsScreen from './components/ResultsScreen'

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
        <UploadScreen onResults={handleResults} />
      )}
      {currentScreen === 'results' && (
        <ResultsScreen chapters={results} />
      )}
    </div>
  )
}

export default App