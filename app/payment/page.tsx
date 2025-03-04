"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Wallet, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import BackgroundAnimations from "@/components/background-animations"
import Image from "next/image"

// Payment methods
const paymentMethods = [
  {
    id: "qris",
    name: "QRIS",
    icon: <QrCode className="h-6 w-6" />,
    description: "Scan QRIS code with any e-wallet app",
    accountInfo: "Scan the QR code to pay",
  },
  {
    id: "dana",
    name: "DANA",
    icon: <Wallet className="h-6 w-6" />,
    description: "Pay with DANA e-wallet",
    accountInfo: "DANA: 085624763201 (Vynnox Rzy)",
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: <Wallet className="h-6 w-6" />,
    description: "Pay with GoPay e-wallet",
    accountInfo: "GoPay: 085624763201 (Vynnox Rzy)",
  },
  {
    id: "ovo",
    name: "OVO",
    icon: <Wallet className="h-6 w-6" />,
    description: "Pay with OVO e-wallet",
    accountInfo: "OVO: 085624763201 (Vynnox Rzy)",
  },
]

// Sample product data (same as in app/page.tsx)
const products = [
  {
    id: 1,
    name: "Hosting Bot Pterodactyl",
    description: "This is a pterodactyl bot hosting product that functions to run bots",
    price: 15000,
    category: "Hosting",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
  {
    id: 2,
    name: "Paid Editing",
    description: "jj slowmotion and conematic editing services",
    price: 10000,
    category: "Editing",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
  {
    id: 3,
    name: "Pairing Nevaria v12 Gen2",
    description: "namely pairing the bot wa nevaria v12 gen 2 script",
    price: 50000,
    category: "BOT WA",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
  {
    id: 4,
    name: "Murbug Nevaria",
    description: "This is a WhatsApp bug for students who can play pranks on their parents' former teacher friends",
    price: 15000,
    category: "MURBUG",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
  {
    id: 5,
    name: "Reseller Panel Pterodactyl",
    description: "pterodactyl panel reseller is a reseller who can create a pterodactyl account",
    price: 20000,
    category: "Reseller",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
  {
    id: 6,
    name: "Jasa Pembuatan Web",
    description: "web creation from shop portfolio etc.",
    price: 40000,
    category: "Coding",
    image: "https://files.catbox.moe/qic76c.jpg",
  },
]

export default function PaymentPage() {
  const router = useRouter()
  const [cart, setCart] = useState<number[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [visitorCount, setVisitorCount] = useState(1000)
  const [showQrCode, setShowQrCode] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    } else {
      // Redirect to home if cart is empty
      router.push("/")
    }

    // Simulate visitor count
    const randomVisitors = Math.floor(Math.random() * 500) + 1000
    setVisitorCount(randomVisitors)
  }, [router])

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Calculate total price
  const totalPrice = products
    .filter((product) => cart.includes(product.id))
    .reduce((sum, product) => sum + product.price, 0)

  // Handle payment method selection
  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayment(paymentId)
    if (paymentId === "qris") {
      setShowQrCode(true)
    } else {
      setShowQrCode(false)
    }
  }

  // Handle continue to confirmation
  const handleContinue = () => {
    if (selectedPayment) {
      // Save selected payment method to localStorage
      localStorage.setItem("selectedPayment", selectedPayment)
      router.push("/confirmation")
    }
  }

  // Handle back to home
  const handleBack = () => {
    router.push("/")
  }

  // Floating particles animation
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-900 text-white relative overflow-hidden">
      <BackgroundAnimations />
      <FloatingParticles />

      <div className="relative z-10">
        {/* Navbar */}
        <Navbar cartCount={cart.length} handleCheckout={() => {}} visitorCount={visitorCount} />

        {/* Payment Selection */}
        <div className="container mx-auto py-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" className="mb-4 text-white/70 hover:text-white" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shopping
            </Button>

            <h1 className="text-3xl font-bold mb-6">Select Payment Method</h1>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Payment Methods */}
              <div>
                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <motion.div key={method.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`bg-white/10 backdrop-blur-sm border-none cursor-pointer overflow-hidden relative ${
                          selectedPayment === method.id ? "ring-2 ring-purple-400" : ""
                        }`}
                        onClick={() => handleSelectPayment(method.id)}
                      >
                        {/* Electric effect overlay */}
                        {selectedPayment === method.id && (
                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                              {Array.from({ length: 5 }).map((_, i) => (
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
                        )}

                        {/* Anime character */}
                        {selectedPayment === method.id && (
                          <motion.div
                            className="absolute bottom-0 right-0 w-16 h-16 z-10 opacity-80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.8, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src="https://files.catbox.moe/q9amvm.png
                              alt="Char Animek"
                              width={64}
                              height={64}
                              className="object-contain"
                            />
                          </motion.div>
                        )}

                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-500/20 p-3 rounded-full">{method.icon}</div>
                            <div>
                              <h3 className="font-medium text-lg">{method.name}</h3>
                              <p className="text-sm text-white/70">{method.description}</p>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <Image
                              src={method.logo || "/placeholder.svg"}
                              alt={`${method.name} logo`}
                              width={80}
                              height={30}
                              className="object-contain"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {showQrCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-hidden"
                  >
                    <h3 className="text-lg font-medium mb-2">Scan QRIS Code</h3>
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-lg">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="QRIS Code"
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-center mt-2 text-white/70">
                      Scan this QR code with any e-wallet app to complete payment
                    </p>
                  </motion.div>
                )}

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                  size="lg"
                  disabled={!selectedPayment}
                  onClick={handleContinue}
                >
                  Continue to Payment
                </Button>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-white/10 backdrop-blur-sm border-none overflow-hidden">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products
                        .filter((product) => cart.includes(product.id))
                        .map((product) => (
                          <div key={product.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-purple-500/20 rounded-md overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-white/70">{product.category}</p>
                              </div>
                            </div>
                            <p className="font-semibold">{formatPrice(product.price)}</p>
                          </div>
                        ))}

                      <div className="border-t border-white/10 my-4 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70">Subtotal</span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-white/70">Tax</span>
                          <span>{formatPrice(totalPrice * 0.1)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4 text-xl font-bold">
                          <span>Total</span>
                          <span>{formatPrice(totalPrice * 1.1)}</span>
                        </div>
                      </div>

                      {selectedPayment && (
                        <div className="bg-white/10 p-3 rounded-lg mt-4">
                          <h4 className="font-medium mb-1">Payment Details</h4>
                          <p className="text-sm text-white/70">
                            {paymentMethods.find((m) => m.id === selectedPayment)?.accountInfo}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto py-6 px-4 border-t border-white/10 mt-10">
          <div className="text-center text-sm text-white/60">
            <p>© 2024 Vynnox Rzy. All rights reserved.</p>
            <p className="mt-1">Created with by Vynnox Rzy 🚀</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

