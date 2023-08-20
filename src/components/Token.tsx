import * as base32 from 'hi-base32'
import React, { useEffect, useState } from 'react'

import { totp } from '../utils/otp'

import Timer from './Timer'
interface IToken {
  account: string
  secret: string
  description?: string
}
function Token({ token }: { token: IToken }) {
  const [tokenName, setTokenName] = useState(token.account)
  const [secret, setSecret] = useState(token.secret)
  const [runningTime, setRunningTime] = useState(0)
  const [result, setResult] = useState('')

  useEffect(() => {
    async function generateTOTP() {
      const { runningTime, otp } = await totp(secret)
      setResult(otp)
      setRunningTime(runningTime)
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
        <input defaultValue={result} readOnly type='text' />
        <Timer runningTime={runningTime} />
      </fieldset>
    </div>
  )
}

export default Token
