import { useEffect } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

import Logo from './components/Logo'
import Token from './components/Token'
import tokens from './tokens'
function App() {
  const prefersColorScheme = usePrefersColorScheme()


  useEffect(() => {
    const favicon = document.querySelector('#favicon') as HTMLLinkElement
    if (prefersColorScheme === 'light') favicon.href = '/favicon-dark.svg'
    else favicon.href = '/favicon-light.svg'
  }, [prefersColorScheme])


  return (
    <>
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Logo />
        <h1>Time-based one-time password</h1>
      </header>
      <main>
        {tokens.map((token) => (
          <Token token={token} />
        ))}
      </main>
    </>
  )
}

export default App
