import usePrefersColorScheme from 'use-prefers-color-scheme'

function Timer({
  runningTime,
  secondsTillExpiration,
}: {
  runningTime: number
  secondsTillExpiration: number
}) {
  const prefersColorScheme = usePrefersColorScheme()

  const color = prefersColorScheme === 'dark' ? 'dark-light' : 'light-dark'

  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '24px',
        padding: '8px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `conic-gradient(transparent ${
          (100 / 30) * runningTime
        }%, var(--${color}) 0)`,
      }}
    >
      {secondsTillExpiration}
    </div>
  )
}

export default Timer
