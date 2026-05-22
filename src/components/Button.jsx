const variants = {
  primary: 'bg-rose-500 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400',
  secondary: 'bg-white/10 text-white hover:bg-white/15',
  ghost: 'bg-transparent text-zinc-300 hover:bg-white/10',
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  return (
    <button
      className={`min-h-12 rounded-lg px-5 py-3 text-base font-semibold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
