function PlayerInputs({ players, onChange }) {
  return (
    <div className="grid gap-3">
      {players.map((player, index) => (
        <label className="grid gap-2" key={index}>
          <span className="text-sm font-medium text-zinc-400">Player {index + 1}</span>
          <input
            className="h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/15"
            maxLength={24}
            onChange={(event) => onChange(index, event.target.value)}
            placeholder={index === 0 ? 'Required' : 'Optional'}
            value={player}
          />
        </label>
      ))}
    </div>
  )
}

export default PlayerInputs
