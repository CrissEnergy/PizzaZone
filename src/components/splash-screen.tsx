'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('splash-screen-shown')) {
        setIsLoading(false)
        return
      }
    } catch (error) {
      // In case sessionStorage is not available
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
      try {
        sessionStorage.setItem('splash-screen-shown', 'true')
      } catch (error) {
        console.error('Failed to set sessionStorage item', error)
      }
    }, 4000) // 4 seconds total for the splash screen

    return () => clearTimeout(timer)
  }, [])

  const welcomeText = 'Welcome'
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.1,
      },
    }),
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.3,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 1.6,
            }}
          >
            <Image
              src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
              alt="Pizza Zone Logo"
              width={200}
              height={200}
              className="h-32 w-auto md:h-40"
              priority
            />
          </motion.div>
          <motion.div
            className="mt-6 flex font-headline text-3xl font-bold text-primary md:text-4xl"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, delayChildren: 1.5 }}
          >
            {welcomeText.split('').map((char, index) => (
              <motion.span key={`${char}-${index}`} variants={textVariants} custom={index}>
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
