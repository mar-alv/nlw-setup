interface Props {
  progress: number
}

export function ProgressBar({ progress }: Props) {
  const progressBarStyles = {
    width: `${progress}%`
  }

  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div
        className='h-3 rounded-xl bg-violet-600 transition-all'
        role='progressbar'
        aria-valuenow={progress}
        style={progressBarStyles}
        aria-label='Progresso de hábitos completados nesse dia'
      />
    </div>
  )
}
