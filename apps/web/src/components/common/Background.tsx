// apps/mini-app/src/components/common/Background.tsx

export function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[50%] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-lighten"></div>
      <div className="absolute top-[10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-lighten"></div>
    </div>
  )
}