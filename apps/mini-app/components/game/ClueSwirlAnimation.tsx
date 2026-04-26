// components/game/ClueSwirlAnimation.tsx
import { useRive, Layout, Fit } from '@rive-app/react-canvas'

export function ClueSwirlAnimation({ intensity }: { intensity: number }) {
  const { RiveComponent } = useRive({
    src: '/animations/clue-swirl.riv',
    stateMachines: 'SwirlSM',
    autoplay: true,
    layout: new Layout({ fit: Fit.Cover }),
  })
  // intensity 0–1 mapped to day (1.0 = Monday chaos, 0 = Friday clear)
  return <RiveComponent className="absolute inset-0 pointer-events-none" />
}