"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import ProductCard from "@/components/product-card"
import LoadingScreen from "@/components/loading-screen"
import AiRecommendation from "@/components/ai-recommendation"
import Navbar from "@/components/navbar"
import BackgroundAnimations from "@/components/background-animations"
import ProductInfoSection from "@/components/product-info-section"
import { useRouter } from "next/navigation"

// Sample product data
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

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<number[]>([])
  const [visitorCount, setVisitorCount] = useState(0)

  // Categories
  const categories = ["All", "Social Media", "Website", "Advertising", "Content", "Email"]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Simulate visitor count (would be replaced with actual analytics in production)
    const randomVisitors = Math.floor(Math.random() * 500) + 1000
    setVisitorCount(randomVisitors)

    // Simulate visitor count increasing over time
    const visitorInterval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000)

    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    return () => {
      clearTimeout(timer)
      clearInterval(visitorInterval)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Filter products based on search, price range and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

    return matchesSearch && matchesPrice && matchesCategory
  })

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Handle checkout - now redirects to payment page
  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/payment")
    }
  }

  // Add to cart function
  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id])
    }
  }

  // Remove from cart function
  const removeFromCart = (id: number) => {
    setCart(cart.filter((itemId) => itemId !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-900 text-white relative overflow-hidden">
      <BackgroundAnimations />

      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* Navbar */}
            <Navbar cartCount={cart.length} handleCheckout={handleCheckout} visitorCount={visitorCount} />

            {/* Hero Section */}
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="container mx-auto py-10 px-4 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Boost Your Digital Presence</h2>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
                Professional digital marketing services to help your business grow online
              </p>

              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  className="pl-10 bg-white/10 backdrop-blur-sm border-none text-white placeholder:text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.section>

            {/* Filters */}
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="container mx-auto py-6 px-4"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Filters</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <Slider
                      defaultValue={[0, 5000000]}
                      max={5000000}
                      step={100000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={
                            selectedCategory === category
                              ? "bg-purple-500 hover:bg-purple-600"
                              : "bg-white/10 backdrop-blur-sm border-none hover:bg-white/20"
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Site Statistics */}
            <ProductInfoSection className="container mx-auto mb-6 px-4" />

            {/* AI Recommendation */}
            <AiRecommendation products={products} addToCart={addToCart} formatPrice={formatPrice} />

            {/* Products */}
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="container mx-auto py-10 px-4"
            >
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xl">No services found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      formatPrice={formatPrice}
                      inCart={cart.includes(product.id)}
                      addToCart={() => addToCart(product.id)}
                      removeFromCart={() => removeFromCart(product.id)}
                    />
                  ))}
                </div>
              )}
            </motion.section>

            {/* Checkout Section */}
            {cart.length > 0 && (
              <motion.section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="container mx-auto py-10 px-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  </div>

                  <h2 className="text-2xl font-bold mb-6 relative z-10">Your Cart</h2>

                  <div className="space-y-4 relative z-10">
                    {products
                      .filter((product) => cart.includes(product.id))
                      .map((product) => (
                        <div key={product.id} className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-purple-200">{product.category}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold">{formatPrice(product.price)}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(product.id)}
                              className="bg-red-500/20 hover:bg-red-500/30 border-none"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                    <div className="border-t border-white/20 my-4 pt-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold">Total</h3>
                      </div>
                      <p className="text-xl font-bold">
                        {formatPrice(
                          products
                            .filter((product) => cart.includes(product.id))
                            .reduce((sum, product) => sum + product.price, 0),
                        )}
                      </p>
                    </div>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 mt-4 group"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Payment
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Footer */}
            <footer className="container mx-auto py-6 px-4 border-t border-white/10 mt-10">
              <div className="text-center text-sm text-white/60">
                <p>© 2024 Vynnox Rzy. All rights reserved.</p>
                <p className="mt-1">Created with ❤️ by Vynnox Rzy</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

