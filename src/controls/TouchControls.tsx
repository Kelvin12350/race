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
    },
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault() // This completely disables the long-press popup
    }
  })


    return (
    <div className="touch-controls-overlay">
      <div className="touch-dpad">
        {/* Left Arrow */}
        <button {...bindTouch('left')}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path fill="white" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        {/* Right Arrow */}
        <button {...bindTouch('right')}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path fill="white" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>

      <div className="touch-actions">
        {/* Boost (Lightning Bolt) */}
        <button {...bindTouch('boost')} className="boost-btn">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path fill="white" d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
        </button>
        {/* Brake/Reverse (Down Arrow) */}
        <button {...bindTouch('backward')}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path fill="white" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        {/* Drive/Gas (Up Arrow) */}
        <button {...bindTouch('forward')}>
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path fill="white" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
