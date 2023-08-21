import * as base32 from 'hi-base32'
import React, { useEffect, useState } from 'react'
import totp from 'totp-generator'

import Timer from './Timer'
interface IToken {
  account: string
  secret: string
  description?: string
}
function Token({
  token,
  setCopiedText,
}: {
  token: IToken
  setCopiedText: React.Dispatch<React.SetStateAction<string>>
}) {
  const [tokenName, setTokenName] = useState(token.account)
  const [secret, setSecret] = useState(token.secret)
  const [runningTime, setRunningTime] = useState(0)
  const [secondsTillExpiration, setSecondsTillExpiration] = useState(0)
  const [result, setResult] = useState('')
  const period = 30
  const digits = 6
  useEffect(() => {
    async function generateTOTP() {
      const token = totp(secret.replaceAll(' ', '').trim(), {
        digits,
        period,
      })

      const secondsSinceEpoch = Math.ceil(Date.now() / 1000) - 1
      const secondsSinceStart = 0 + (secondsSinceEpoch % period)
      const secondsRemaining = period - (secondsSinceEpoch % period)

      setResult(token)
      setRunningTime(secondsSinceStart)
      setSecondsTillExpiration(secondsRemaining)
    }

    generateTOTP()

    const interval = setInterval(() => {
      generateTOTP()
    }, 1000)

    return () => clearInterval(interval)
  }, [secret])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSecret(event.target.value)
  }
  function handleTokenNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTokenName(event.target.value)
  }

  function copyToClipboard() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(result)
    // Send it back up the tree
    setCopiedText(result)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
      <fieldset style={{ marginBottom: '1rem' }}>
        <legend>Name</legend>
        <input
          defaultValue={tokenName}
          onChange={handleTokenNameChange}
          type='text'
          readOnly
        />
      </fieldset>
      <fieldset style={{ marginBottom: '1rem', display: 'none' }}>
        <legend>Secret</legend>
        <input defaultValue={secret} onChange={handleChange} type='text' />
      </fieldset>
      <fieldset style={{ marginBottom: '1rem', display: 'none' }}>
        <legend>Encoded secret</legend>
        <input
          readOnly
          type='text'
          value={base32.encode(secret)?.replace(/=/g, '')}
        />
      </fieldset>
      <fieldset style={{ marginBottom: '1rem' }}>
        <legend>One-time password</legend>
        <input
          defaultValue={result}
          readOnly
          type='text'
          onClick={copyToClipboard}
          style={{ cursor: 'pointer' }}
        />
        <legend
          onClick={copyToClipboard}
          style={{
            cursor: 'pointer',
            fontSize: '8px',
            marginTop: 'auto',
            width: '100%',
          }}
        >
          click to copy
        </legend>
        <Timer
          runningTime={runningTime}
          secondsTillExpiration={secondsTillExpiration}
        />
      </fieldset>
    </div>
  )
}

export default Token
