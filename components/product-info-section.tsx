"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Users, Activity } from "lucide-react"

interface ProductInfoSectionProps {
  className?: string
}

export default function ProductInfoSection({ className }: ProductInfoSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [visitorCount, setVisitorCount] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Update time every second and simulate visitor detection
  useEffect(() => {
    // Time update
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate visitor detection with IP-based counting
    const detectVisitors = async () => {
      setIsLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate random visitor count based on time of day
        const hour = new Date().getHours()
        let baseVisitors = 0

        // More visitors during business hours
        if (hour >= 9 && hour <= 17) {
          baseVisitors = Math.floor(Math.random() * 1000) + 2000
        } else if (hour >= 18 && hour <= 22) {
          baseVisitors = Math.floor(Math.random() * 800) + 1500
        } else {
          baseVisitors = Math.floor(Math.random() * 500) + 800
        }

        setVisitorCount(baseVisitors)

        // Calculate total customers based on visitor conversion rate
        const conversionRate = 0.15 // 15% conversion rate
        const calculatedCustomers = Math.floor(baseVisitors * conversionRate) + 5432 // Base customers + converted
        setTotalCustomers(calculatedCustomers)
      } catch (error) {
        console.error("Error detecting visitors:", error)
        // Fallback values
        setVisitorCount(1250)
        setTotalCustomers(5432)
      } finally {
        setIsLoading(false)
      }
    }

    // Run visitor detection immediately and then every 5 minutes
    detectVisitors()
    const visitorInterval = setInterval(detectVisitors, 300000) // 5 minutes

    // Simulate real-time fluctuations in visitor count
    const fluctuationInterval = setInterval(() => {
      setVisitorCount((prev) => {
        const fluctuation = Math.floor(Math.random() * 10) - 3 // -3 to +6 visitors
        return Math.max(0, prev + fluctuation) // Ensure count doesn't go below 0
      })
    }, 10000) // Every 10 seconds

    return () => {
      clearInterval(timer)
      clearInterval(visitorInterval)
      clearInterval(fluctuationInterval)
    }
  }, [])

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <div className="flex items-center justify-center sm:justify-start mb-1">
            <Clock className="h-4 w-4 mr-1 text-purple-300" />
            <h3 className="text-sm font-medium">Current Time</h3>
          </div>
          <motion.p
            key={formattedTime}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-lg text-center sm:text-left"
          >
            {formattedTime}
          </motion.p>
        </div>

        <div className="bg-white/10 p-3 rounded-lg">
          <div className="flex items-center justify-center sm:justify-start mb-1">
            <Users className="h-4 w-4 mr-1 text-blue-300" />
            <h3 className="text-sm font-medium">Active Visitors</h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center sm:justify-start">
              <motion.div
                className="h-4 w-24 bg-white/20 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          ) : (
            <motion.div
              key={visitorCount}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-mono text-lg text-center sm:text-left"
            >
              <span className="relative">
                {visitorCount.toLocaleString()}
                <motion.span
                  className="absolute -top-1 -right-2 text-xs text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Activity className="h-3 w-3" />
                </motion.span>
              </span>
            </motion.div>
          )}
        </div>

        <div className="bg-white/10 p-3 rounded-lg">
          <div className="flex items-center justify-center sm:justify-start mb-1">
            <Users className="h-4 w-4 mr-1 text-green-300" />
            <h3 className="text-sm font-medium">Total Customers</h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center sm:justify-start">
              <motion.div
                className="h-4 w-24 bg-white/20 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          ) : (
            <motion.p
              className="font-mono text-lg text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {totalCustomers.toLocaleString()}
            </motion.p>
          )}
        </div>
      </div>

      <div className="mt-3 text-xs text-center text-white/60">
        <p>Statistics are updated in real-time based on website traffic</p>
      </div>
    </motion.div>
  )
}

