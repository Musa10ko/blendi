// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className: string }) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary ${className}`}
      animate={{ backgroundPosition: ['0%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  )
}

// Usage
{isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> : <NFTCard />}