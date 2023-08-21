import { useEffect, useState } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

import Logo from './components/Logo'
import Token from './components/Token'
import tokens from './tokens'
function App() {
  const prefersColorScheme = usePrefersColorScheme()
  const [copiedText, setCopiedText] = useState('')
  useEffect(() => {
    const favicon = document.querySelector('#favicon') as HTMLLinkElement
    if (prefersColorScheme === 'light') favicon.href = '/favicon-dark.svg'
    else favicon.href = '/favicon-light.svg'
  }, [prefersColorScheme])

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('reset')
      setCopiedText('')
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [copiedText])
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
        <h1>Authenticator</h1>
      </header>
      <main>
        {tokens.map((token, index) => (
          <Token key={index} token={token} setCopiedText={setCopiedText} />
        ))}
        <div style={{ display: copiedText === '' ? 'none' : 'block' }}>
          Copied: {copiedText}
        </div>
      </main>
    </>
  )
}

export default App
