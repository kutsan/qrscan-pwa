import { ReactElement, useState } from 'react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Results } from './components/Results'
import { Scanner } from './components/Scanner'
import './App.css'

export const App = (): ReactElement => {
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
          <Results decodedData={result} onNewScan={() => setResult(null)} />
        )}
      </main>

      <Footer />
    </>
  )
}
