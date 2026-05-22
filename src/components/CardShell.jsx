function CardShell({ children, className = '' }) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-zinc-900/90 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

export default CardShell
