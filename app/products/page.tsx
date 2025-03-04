"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Star, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample product data
const productsData = [
  {
    id: 1,
    name: "Paket Social Media Management",
    description: "Pengelolaan lengkap sosial media untuk bisnis Anda",
    price: 2500000,
    category: "Social Media",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: 2,
    name: "SEO Optimization Basic",
    description: "Optimasi mesin pencari untuk meningkatkan peringkat website",
    price: 1500000,
    category: "SEO",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: 3,
    name: "Content Marketing Premium",
    description: "Strategi konten berkualitas tinggi untuk engagement maksimal",
    price: 3500000,
    category: "Content",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: 4,
    name: "Google Ads Campaign",
    description: "Kampanye iklan Google yang ditargetkan untuk ROI maksimal",
    price: 2000000,
    category: "Ads",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: 5,
    name: "Email Marketing Automation",
    description: "Otomatisasi email marketing untuk nurturing leads",
    price: 1800000,
    category: "Email",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: 6,
    name: "Website Development & SEO",
    description: "Pembuatan website dengan optimasi SEO terintegrasi",
    price: 5000000,
    category: "Website",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: 7,
    name: "Instagram Growth Package",
    description: "Strategi pertumbuhan Instagram organik dan berbayar",
    price: 1200000,
    category: "Social Media",
    rating: 4.4,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: 8,
    name: "TikTok Marketing Strategy",
    description: "Strategi marketing TikTok untuk brand awareness",
    price: 1800000,
    category: "Social Media",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
]

// Format price to IDR
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductsPage() {
  const [products, setProducts] = useState(productsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [loading, setLoading] = useState(true)
  const [aiRecommendation, setAiRecommendation] = useState<number | null>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = productsData.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Category filter
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesPrice && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
      default:
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setProducts(filtered)
  }, [searchTerm, priceRange, selectedCategory, sortBy])

  // Simple AI recommendation based on viewed products
  useEffect(() => {
    // Simulate AI recommendation after page loads
    const timer = setTimeout(() => {
      // Randomly select a product to recommend
      const randomIndex = Math.floor(Math.random() * productsData.length)
      setAiRecommendation(productsData[randomIndex].id)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const categories = ["all", "Social Media", "SEO", "Content", "Ads", "Email", "Website"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-white">
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-white z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-purple-200 border-t-purple-800 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-purple-900 mb-4 md:mb-0">Layanan Digital Marketing</h1>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Cari layanan..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Harga: Rendah ke Tinggi</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Harga: Tinggi ke Rendah</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating Tertinggi</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById("filter-dialog")?.showModal()}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* AI Recommendation */}
            {aiRecommendation && (
              <motion.div
                className="mb-8 bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg border border-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-purple-600 text-white p-1 rounded">AI</div>
                  <h3 className="font-semibold text-purple-800">Rekomendasi untuk Anda</h3>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Berdasarkan analisis kebutuhan bisnis, kami merekomendasikan:
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={productsData.find((p) => p.id === aiRecommendation)?.image || "/placeholder.svg"}
                    alt="Recommended product"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h4 className="font-medium text-purple-900">
                      {productsData.find((p) => p.id === aiRecommendation)?.name}
                    </h4>
                    <p className="text-sm text-purple-700">
                      {formatPrice(productsData.find((p) => p.id === aiRecommendation)?.price || 0)}
                    </p>
                    <Link href={`/products/${aiRecommendation}`}>
                      <Button size="sm" className="mt-2 bg-purple-700 hover:bg-purple-800">
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Category Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start md:justify-center p-1 bg-purple-100 rounded-lg">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category === "all" ? "Semua Kategori" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/products/${product.id}`}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            {product.featured && (
                              <Badge className="absolute top-2 right-2 bg-purple-600">Featured</Badge>
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                                  />
                                ))}
                              <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                            </div>
                            <Badge variant="outline" className="bg-purple-50">
                              {product.category}
                            </Badge>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <p className="font-bold text-purple-800">{formatPrice(product.price)}</p>
                            <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                              Detail
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-500">Tidak ada layanan yang sesuai dengan filter Anda.</p>
                    <Button
                      variant="link"
                      className="mt-2 text-purple-700"
                      onClick={() => {
                        setSearchTerm("")
                        setPriceRange([0, 5000000])
                        setSelectedCategory("all")
                        setSortBy("featured")
                      }}
                    >
                      Reset Filter
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Dialog */}
      <dialog id="filter-dialog" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg max-w-md mx-auto">
          <h3 className="font-bold text-lg mb-4 text-purple-900">Filter Layanan</h3>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-purple-800">Rentang Harga</h4>
            <div className="px-2">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={5000000}
                step={100000}
                onValueChange={(value) => setPriceRange(value as number[])}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setPriceRange([0, 5000000])
                setSelectedCategory("all")
                document.getElementById("filter-dialog")?.close()
              }}
            >
              Reset
            </Button>
            <Button
              className="bg-purple-700 hover:bg-purple-800"
              onClick={() => document.getElementById("filter-dialog")?.close()}
            >
              Terapkan
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

