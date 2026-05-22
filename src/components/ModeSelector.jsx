const modes = [
  { id: 'piccolo', label: 'Piccolo' },
  { id: 'deep', label: 'Deep Talk' },
  { id: 'mixed', label: 'Mixed' },
]

function ModeSelector({ selectedMode, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-black/30 p-1">
      {modes.map((mode) => {
        const isSelected = selectedMode === mode.id

        return (
          <button
            className={`min-h-11 rounded-md px-2 text-sm font-bold transition ${
              isSelected
                ? 'bg-white text-zinc-950'
                : 'text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            type="button"
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}

export default ModeSelector
