import CardShell from './CardShell'

function GameCard({ question, progress }) {
  return (
    <CardShell className="min-h-[18rem] w-full animate-card-in p-6 sm:min-h-[20rem] sm:p-8">
      <div className="flex h-full min-h-[15rem] flex-col justify-between gap-8">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          <span>{question.type}</span>
          <span>{progress}</span>
        </div>
        <p className="text-balance text-center text-3xl font-black leading-tight text-white sm:text-4xl">
          {question.text}
        </p>
        <div className="h-3" />
      </div>
    </CardShell>
  )
}

export default GameCard
