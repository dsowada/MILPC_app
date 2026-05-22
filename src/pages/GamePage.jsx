import Button from '../components/Button'
import GameCard from '../components/GameCard'

function GamePage({ modeLabel, onNext, onReset, onSkip, progress, question }) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-md gap-5">
        <header className="flex items-center justify-between gap-4 px-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
              Mode
            </p>
            <h1 className="text-xl font-black text-white">{modeLabel}</h1>
          </div>
          <Button className="min-h-10 px-3 py-2 text-sm" onClick={onReset} variant="ghost">
            New Game
          </Button>
        </header>

        <GameCard key={question.id} question={question} progress={progress} />

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onSkip} variant="secondary">
            Skip
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </main>
  )
}

export default GamePage
