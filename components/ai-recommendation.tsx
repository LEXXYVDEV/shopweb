"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

interface AiRecommendationProps {
  products: Product[]
  addToCart: (id: number) => void
  formatPrice: (price: number) => string
}

export default function AiRecommendation({ products, addToCart, formatPrice }: AiRecommendationProps) {
  const [recommendation, setRecommendation] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showRecommendation, setShowRecommendation] = useState(false)

  // Simulate AI recommendation
  const getRecommendation = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Randomly select a product as a recommendation
      const randomIndex = Math.floor(Math.random() * products.length)
      setRecommendation(products[randomIndex])
      setIsLoading(false)
      setShowRecommendation(true)
    }, 2000)
  }

  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55 }}
      className="container mx-auto py-6 px-4"
    >
      <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-none overflow-hidden relative">
        {/* Electric effect overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 bg-blue-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: 0,
                  right: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 1, 0],
                  translateX: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="relative h-24 w-24 md:h-32 md:w-32 bg-indigo-600/30 rounded-full flex items-center justify-center">
                  <Bot className="h-12 w-12 md:h-16 md:w-16 text-indigo-300" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: ["0 0 0 0px rgba(165, 180, 252, 0.3)", "0 0 0 10px rgba(165, 180, 252, 0)"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-300" />
                AI Recommendation
              </h2>
              <p className="text-purple-200 mb-4">
                Let our AI suggest the perfect digital marketing service for your business needs
              </p>

              {!showRecommendation && (
                <Button onClick={getRecommendation} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      Analyzing your needs...
                    </>
                  ) : (
                    <>Get AI Recommendation</>
                  )}
                </Button>
              )}
            </div>
          </div>

          {showRecommendation && recommendation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={recommendation.image || "/placeholder.svg"}
                    alt={recommendation.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2">
                    <motion.div
                      className="h-16 w-16 opacity-80"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src="/anime-character.png"
                        alt="Anime character"
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{recommendation.name}</h3>
                    <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs">{recommendation.category}</span>
                  </div>
                  <p className="text-sm text-gray-300 my-2">{recommendation.description}</p>
                  <div className="flex items-center mt-2 mb-4">
                    <Zap className="h-4 w-4 text-yellow-300 mr-1" />
                    <p className="text-xl font-bold">{formatPrice(recommendation.price)}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => addToCart(recommendation.id)}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20"
                      onClick={() => setShowRecommendation(false)}
                    >
                      Get Another Recommendation
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  )
}

