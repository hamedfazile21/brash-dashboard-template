const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="glass-solid flex items-center gap-x-1 rounded-2xl rounded-es-md px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default TypingIndicator
