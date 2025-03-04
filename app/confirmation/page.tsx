"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Upload, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import BackgroundAnimations from "@/components/background-animations"
import Image from "next/image"

// Sample product data (same as in app/page.tsx)
const products = [
  {
    id: 1,
    name: "Instagram Growth Package",
    description: "Boost your Instagram followers and engagement",
    price: 1500000,
    category: "Social Media",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "SEO Optimization",
    description: "Improve your website ranking on search engines",
    price: 2500000,
    category: "Website",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Facebook Ads Campaign",
    description: "Targeted Facebook ads to reach your audience",
    price: 1800000,
    category: "Advertising",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Content Creation Package",
    description: "Professional content for your digital platforms",
    price: 3500000,
    category: "Content",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Email Marketing Setup",
    description: "Complete email marketing automation solution",
    price: 1200000,
    category: "Email",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "TikTok Viral Package",
    description: "Strategy to make your content go viral on TikTok",
    price: 2000000,
    category: "Social Media",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Payment methods
const paymentMethods = [
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: <Zap className="h-6 w-6" />,
    description: "Transfer to our bank account",
    accountInfo: "Bank BCA: 1234567890 (Vynnox Rzy)",
  },
  {
    id: "credit_card",
    name: "Credit Card",
    icon: <Zap className="h-6 w-6" />,
    description: "Pay with Visa, Mastercard, or American Express",
    accountInfo: "Secure payment via payment gateway",
  },
  {
    id: "e_wallet",
    name: "E-Wallet",
    icon: <Zap className="h-6 w-6" />,
    description: "Pay with GoPay, OVO, or DANA",
    accountInfo: "Scan QR code or enter phone number",
  },
]

export default function ConfirmationPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cart, setCart] = useState<number[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [visitorCount, setVisitorCount] = useState(1000)
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalCustomers, setTotalCustomers] = useState(5432) // Simulated total customer count

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    } else {
      // Redirect to home if cart is empty
      router.push("/")
    }

    // Load selected payment method
    const savedPayment = localStorage.getItem("selectedPayment")
    if (savedPayment) {
      setSelectedPayment(savedPayment)
    } else {
      // Redirect to payment page if no payment method selected
      router.push("/payment")
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

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPaymentProof(file)

      // Create a temporary URL for the uploaded file
      const fileUrl = URL.createObjectURL(file)
      setPaymentProofUrl(fileUrl)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  // Handle WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    const selectedProducts = products.filter((product) => cart.includes(product.id))

    // Create a message that includes a reference to the uploaded image
    const message = `Halo, saya ${name} telah melakukan pembayaran untuk:\n\n${selectedProducts.map((p) => `- ${p.name} (${formatPrice(p.price)})`).join("\n")}\n\nTotal: ${formatPrice(totalPrice * 1.1)}\n\nMetode Pembayaran: ${paymentMethods.find((m) => m.id === selectedPayment)?.name}\n\nEmail: ${email}\nTelp: ${phone}\n\nBukti pembayaran telah saya upload di website dengan nama file: ${paymentProof?.name || "bukti_transfer.jpg"}. Mohon konfirmasi pesanan saya. Terima kasih!`

    window.open(`https://wa.me/6285624763201?text=${encodeURIComponent(message)}`, "_blank")

    // Clear cart after successful order
    localStorage.removeItem("cart")
    localStorage.removeItem("selectedPayment")

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  // Handle back to payment
  const handleBack = () => {
    router.push("/payment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-900 text-white relative overflow-hidden">
      <BackgroundAnimations />

      <div className="relative z-10">
        {/* Navbar */}
        <Navbar cartCount={cart.length} handleCheckout={() => router.push("/payment")} visitorCount={visitorCount} />

        {/* Confirmation Form */}
        <div className="container mx-auto py-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button
              variant="ghost"
              className="mb-4 text-white/70 hover:text-white"
              onClick={handleBack}
              disabled={isComplete}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment Methods
            </Button>

            <h1 className="text-3xl font-bold mb-6">Payment Confirmation</h1>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Confirmation Form */}
              <div>
                {isComplete ? (
                  <Card className="bg-white/10 backdrop-blur-sm border-none overflow-hidden">
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                          <Check className="h-8 w-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Payment Confirmed!</h2>
                        <p className="text-white/70 mb-6">
                          Thank you for your order. Please click the button below to contact us via WhatsApp for order
                          confirmation.
                        </p>
                        <Button className="bg-green-500 hover:bg-green-600" size="lg" onClick={handleWhatsAppRedirect}>
                          Contact via WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/10 backdrop-blur-sm border-none overflow-hidden">
                    <CardHeader>
                      <CardTitle>Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-white/10 border-white/20"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/10 border-white/20"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="bg-white/10 border-white/20"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="payment_proof">Payment Proof</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-white/10 border-white/20 hover:bg-white/20"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              {paymentProof ? "Change File" : "Upload File"}
                            </Button>
                            {paymentProof && <span className="text-sm text-white/70">{paymentProof.name}</span>}
                            <input
                              ref={fileInputRef}
                              type="file"
                              id="payment_proof"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                              required
                            />
                          </div>
                          <p className="text-xs text-white/60 mt-1">
                            Please upload a screenshot or photo of your payment receipt
                          </p>

                          {/* Preview of uploaded image */}
                          {paymentProofUrl && (
                            <div className="mt-2 relative">
                              <div className="w-full h-40 bg-white/10 rounded-md overflow-hidden">
                                <Image
                                  src={paymentProofUrl || "/placeholder.svg"}
                                  alt="Payment proof"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                          size="lg"
                          disabled={isSubmitting || !paymentProof}
                        >
                          {isSubmitting ? "Processing..." : "Confirm Payment"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
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
                          <h4 className="font-medium mb-1">Payment Method</h4>
                          <div className="flex items-center gap-2">
                            <div className="bg-purple-500/20 p-2 rounded-full">
                              {paymentMethods.find((m) => m.id === selectedPayment)?.icon}
                            </div>
                            <div>
                              <p className="font-medium">
                                {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                              </p>
                              <p className="text-sm text-white/70">
                                {paymentMethods.find((m) => m.id === selectedPayment)?.accountInfo}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Site Stats */}
                      <div className="bg-white/10 p-3 rounded-lg mt-4">
                        <h4 className="font-medium mb-2">Site Statistics</h4>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-white/10 p-2 rounded-lg">
                            <p className="text-xs text-white/70">Current Time</p>
                            <p className="font-mono text-sm">{new Date().toLocaleTimeString()}</p>
                          </div>
                          <div className="bg-white/10 p-2 rounded-lg">
                            <p className="text-xs text-white/70">Visitors</p>
                            <p className="font-mono text-sm">{visitorCount.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 p-2 rounded-lg">
                            <p className="text-xs text-white/70">Customers</p>
                            <p className="font-mono text-sm">{totalCustomers.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Anime character */}
                      <motion.div
                        className="absolute bottom-4 right-4 w-24 h-24 z-10 opacity-80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src="/anime-character.png"
                          alt="Anime character"
                          width={96}
                          height={96}
                          className="object-contain"
                        />
                      </motion.div>
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

