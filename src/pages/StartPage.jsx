import Button from '../components/Button'
import CardShell from '../components/CardShell'
import ModeSelector from '../components/ModeSelector'
import PlayerInputs from '../components/PlayerInputs'

function StartPage({
  canStart,
  mode,
  onModeChange,
  onPlayerChange,
  onStart,
  players,
}) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-rose-300">
            Party Game
          </p>
          <h1 className="text-4xl font-black tracking-normal text-white sm:text-5xl">
            Fast cards for loud tables.
          </h1>
        </div>

        <CardShell className="grid gap-6">
          <PlayerInputs players={players} onChange={onPlayerChange} />
          <ModeSelector selectedMode={mode} onSelect={onModeChange} />
          <Button disabled={!canStart} onClick={onStart}>
            Start Game
          </Button>
        </CardShell>
      </div>
    </main>
  )
}

export default StartPage
