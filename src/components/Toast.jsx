import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastCtx = createContext(() => {})

export function useToast() {
  return useContext(ToastCtx)
}

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')
  const timer = useRef(0)

  const show = useCallback((text) => {
    setMsg(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(''), 3600)
  }, [])

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-[85] -translate-x-1/2" aria-live="polite">
        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              role="status"
              className="flex items-center gap-2.5 border border-[rgba(201,168,106,0.4)] bg-[#0e0e11] px-5 py-3 text-sm text-[#f2f0ea] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#c9a86a]" aria-hidden="true" />
              {msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}
