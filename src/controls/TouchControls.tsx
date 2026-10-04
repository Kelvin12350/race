import { useStore, isControl } from '../store'


export function TouchControls() {
  // Grab the identical actions object used by the Keyboard
  const actions = useStore((state) => state.actions)

  // Trigger true on touch down, false on release
  const bindTouch = (actionName: string) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault()
      if (isControl(actionName) && actions[actionName]) actions[actionName](true)
    },
    onPointerUp: (e: React.PointerEvent) => {
      e.preventDefault()
      if (isControl(actionName) && actions[actionName]) actions[actionName](false)
    },
    onPointerLeave: (e: React.PointerEvent) => {
      e.preventDefault()
      if (isControl(actionName) && actions[actionName]) actions[actionName](false)
    }
  })

  return (
    <div className="touch-controls-overlay">
      <div className="touch-dpad">
        <button {...bindTouch('left')}>Left</button>
        <button {...bindTouch('right')}>Right</button>
      </div>
      <div className="touch-actions">
        <button {...bindTouch('boost')} className="boost-btn">Boost</button>
        <button {...bindTouch('forward')}>Drive</button>
        <button {...bindTouch('backward')}>Brake</button>
      </div>
    </div>
  )
}
