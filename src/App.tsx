import { ReactElement, useState } from 'react'

import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Results from './components/Results'
import Scanner from './components/Scanner'

const App = (): ReactElement => {
  const [result, setResult] = useState<string | null>(null)

  return (
    <>
      <Header />

      <main>
        <Scanner
          active={result === null}
          onSuccessfulScan={(qrCodeData) => setResult(qrCodeData)}
        />

        {result !== null && (
          <Results
            active={result !== null}
            decodedData={result}
            onNewScan={() => setResult(null)}
          />
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
