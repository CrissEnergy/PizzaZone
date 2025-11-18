'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypingAnimationProps {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  delay?: number
}

export function TypingAnimation({
  text,
  typingSpeed = 150,
  deletingSpeed = 100,
  delay = 2000,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1))
        } else {
          setIsDeleting(false)
        }
      } else {
        if (displayedText.length < text.length) {
          setDisplayedText((prev) => text.slice(0, prev.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delay)
        }
      }
    }

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, text, typingSpeed, deletingSpeed, delay])

  return (
    <span>
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
        className="ml-1 inline-block h-full"
      >
        |
      </motion.span>
    </span>
  )
}
