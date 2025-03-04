"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-900 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 3D-like rotating cube */}
      <motion.div
        className="relative w-40 h-40 mb-8"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute inset-0 bg-purple-500/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: "translateZ(70px)" }}
        >
          <Zap className="h-16 w-16 text-yellow-300" />
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute inset-0 bg-blue-500/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center"
          style={{ transform: "rotateY(180deg) translateZ(70px)" }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-16 w-16 text-yellow-300" />
          </motion.div>
        </motion.div>

        {/* Left face */}
        <motion.div
          className="absolute inset-0 bg-indigo-500/30 backdrop-blur-md border border-white/20 rounded-lg"
          style={{ transform: "rotateY(-90deg) translateZ(70px)" }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <motion.div
              className="text-2xl font-bold text-white"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Loading... 
            </motion.div>
          </div>
        </motion.div>

        {/* Right face */}
        <motion.div
          className="absolute inset-0 bg-violet-500/30 backdrop-blur-md border border-white/20 rounded-lg"
          style={{ transform: "rotateY(90deg) translateZ(70px)" }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <motion.div
              className="text-2xl font-bold text-white"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              To Web
            </motion.div>
          </div>
        </motion.div>

        {/* Top face */}
        <motion.div
          className="absolute inset-0 bg-pink-500/30 backdrop-blur-md border border-white/20 rounded-lg"
          style={{ transform: "rotateX(90deg) translateZ(70px)" }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-16 h-16 rounded-full border-4 border-t-yellow-300 border-r-purple-300 border-b-blue-300 border-l-green-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom face */}
        <motion.div
          className="absolute inset-0 bg-cyan-500/30 backdrop-blur-md border border-white/20 rounded-lg"
          style={{ transform: "rotateX(-90deg) translateZ(70px)" }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <motion.div
              className="flex space-x-2"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold text-white mb-2 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Vynnox Rzy
      </motion.h1>

      <motion.p
        className="text-purple-200 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Powering your digital success
      </motion.p>

      <motion.div
        className="mt-8 relative h-2 w-64 bg-white/20 rounded-full overflow-hidden z-10"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 256, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-0 left-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12" />
        </motion.div>
      </motion.div>

      {/* Electric animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1, 0],
              translateX: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  )
}

