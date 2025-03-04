"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Trash, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
  }
  formatPrice: (price: number) => string
  inCart: boolean
  addToCart: () => void
  removeFromCart: () => void
}

export default function ProductCard({ product, formatPrice, inCart, addToCart, removeFromCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  // Handle direct checkout
  const handleDirectCheckout = () => {
    // Add to cart first
    addToCart()
    // Then redirect to payment page
    setTimeout(() => {
      router.push("/payment")
    }, 300)
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-none relative h-full flex flex-col">
        {/* Electric effect overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute inset-0 opacity-0" animate={{ opacity: isHovered ? 0.15 : 0 }}>
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
          </motion.div>
        </div>

        {/* Glowing border effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? ["0 0 0 0 rgba(168, 85, 247, 0)", "0 0 0 4px rgba(168, 85, 247, 0.4)", "0 0 0 0 rgba(168, 85, 247, 0)"]
              : "none",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />

        {/* Anime character */}
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image src="/anime-character.png" alt="Anime character" width={96} height={96} className="object-contain" />
        </motion.div>

        <div className="relative pt-4 px-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        <CardContent className="flex-grow pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <motion.span
              className="px-2 py-1 bg-purple-500/20 rounded-full text-xs"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.3)" }}
            >
              {product.category}
            </motion.span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{product.description}</p>
          <div className="flex items-center mt-2">
            <motion.div
              animate={{
                rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-4 w-4 text-yellow-300 mr-1" />
            </motion.div>
            <p className="text-xl font-bold">{formatPrice(product.price)}</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {inCart ? (
            <Button variant="destructive" className="w-full group" onClick={removeFromCart}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center"
                whileHover={{ x: [0, -2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Trash className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Remove from Cart
              </motion.div>
            </Button>
          ) : (
            <>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 group overflow-hidden relative"
                onClick={addToCart}
              >
                <motion.div className="flex items-center relative z-10">
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                  Add to Cart
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              <Button
                className="w-full bg-green-500 hover:bg-green-600 group overflow-hidden relative"
                onClick={handleDirectCheckout}
              >
                <motion.div className="flex items-center relative z-10">
                  <Zap className="h-4 w-4 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                  Buy Now
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-green-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </>
          )}
        </CardFooter>

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  )
}

