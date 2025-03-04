"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Star, ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// Sample product data (same as in products page)
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
    details: {
      description:
        "Paket Social Media Management kami menawarkan solusi lengkap untuk mengelola kehadiran bisnis Anda di platform sosial media. Tim ahli kami akan menangani semua aspek manajemen sosial media, dari pembuatan konten hingga analisis performa.",
      features: [
        "Pengelolaan 3 platform sosial media (Instagram, Facebook, Twitter)",
        "12 konten berkualitas tinggi per bulan",
        "Desain grafis untuk semua konten",
        "Copywriting profesional",
        "Jadwal posting yang konsisten",
        "Interaksi dengan audiens",
        "Laporan analitik bulanan",
        "Strategi pertumbuhan followers",
      ],
      duration: "1 bulan",
      deliverables: "Konten sosial media, laporan analitik, strategi pertumbuhan",
    },
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
    details: {
      description:
        "Paket SEO Optimization Basic kami dirancang untuk meningkatkan peringkat website Anda di mesin pencari. Kami akan mengoptimalkan website Anda dengan teknik SEO terbaik untuk meningkatkan visibilitas online dan mendatangkan lebih banyak traffic organik.",
      features: [
        "Audit SEO menyeluruh",
        "Riset kata kunci",
        "Optimasi on-page untuk 10 halaman",
        "Perbaikan meta tag dan deskripsi",
        "Optimasi kecepatan website",
        "Pelaporan peringkat kata kunci",
        "Analisis kompetitor",
        "Rekomendasi konten",
      ],
      duration: "1 bulan",
      deliverables: "Laporan audit SEO, implementasi optimasi, laporan performa",
    },
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
    details: {
      description:
        "Paket Content Marketing Premium kami menawarkan strategi konten komprehensif yang dirancang untuk meningkatkan engagement dan konversi. Tim konten kami akan menciptakan konten berkualitas tinggi yang sesuai dengan brand Anda dan menarik bagi target audiens.",
      features: [
        "Strategi konten komprehensif",
        "8 artikel blog SEO-friendly per bulan",
        "4 infografis per bulan",
        "2 video pendek per bulan",
        "Distribusi konten di platform yang relevan",
        "Email newsletter bulanan",
        "Analisis performa konten",
        "Optimasi konten berkelanjutan",
      ],
      duration: "1 bulan",
      deliverables: "Artikel blog, infografis, video, laporan performa",
    },
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
    details: {
      description:
        "Paket Google Ads Campaign kami menawarkan pengelolaan kampanye iklan Google yang komprehensif untuk memaksimalkan ROI Anda. Tim ahli kami akan merancang, mengimplementasikan, dan mengoptimalkan kampanye iklan Google untuk mencapai tujuan bisnis Anda.",
      features: [
        "Riset kata kunci mendalam",
        "Pembuatan kampanye Google Ads",
        "Penulisan iklan yang menarik",
        "Pengaturan targeting yang presisi",
        "Optimasi bid dan anggaran",
        "Pengujian A/B untuk iklan",
        "Pelacakan konversi",
        "Retargeting untuk pengunjung website",
        "Laporan performa mingguan",
      ],
      duration: "1 bulan",
      deliverables: "Kampanye Google Ads, laporan performa, rekomendasi optimasi",
    },
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
    details: {
      description:
        "Paket Email Marketing Automation kami membantu Anda mengotomatisasi komunikasi email dengan pelanggan dan prospek. Kami akan merancang dan mengimplementasikan alur email yang efektif untuk nurturing leads dan meningkatkan konversi.",
      features: [
        "Setup platform email marketing",
        "Desain template email responsif",
        "Segmentasi database pelanggan",
        "Pembuatan 4 alur email otomatis",
        "Penulisan copy email yang menarik",
        "A/B testing untuk subject line",
        "Analisis performa kampanye",
        "Optimasi tingkat open rate dan click-through",
      ],
      duration: "1 bulan",
      deliverables: "Template email, alur otomatisasi, laporan performa",
    },
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
    details: {
      description:
        "Paket Website Development & SEO kami menawarkan solusi lengkap untuk membangun website yang tidak hanya menarik secara visual tetapi juga dioptimalkan untuk mesin pencari. Kami akan merancang dan mengembangkan website yang sesuai dengan kebutuhan bisnis Anda.",
      features: [
        "Desain website custom responsif",
        "Hingga 10 halaman website",
        "CMS yang mudah digunakan",
        "Optimasi SEO on-page",
        "Integrasi Google Analytics",
        "Optimasi kecepatan loading",
        "Form kontak dan integrasi email",
        "Pelatihan penggunaan website",
      ],
      duration: "2 bulan",
      deliverables: "Website responsif, dokumentasi, pelatihan",
    },
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
    details: {
      description:
        "Paket Instagram Growth kami dirancang khusus untuk meningkatkan kehadiran brand Anda di Instagram. Kami menggunakan kombinasi strategi organik dan berbayar untuk meningkatkan followers, engagement, dan konversi dari platform Instagram.",
      features: [
        "Audit profil Instagram",
        "Optimasi bio dan profil",
        "8 konten feed Instagram per bulan",
        "15 konten Instagram Story per bulan",
        "Hashtag research",
        "Manajemen engagement",
        "1 kampanye Instagram Ads",
        "Laporan pertumbuhan bulanan",
      ],
      duration: "1 bulan",
      deliverables: "Konten Instagram, kampanye ads, laporan pertumbuhan",
    },
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
    details: {
      description:
        "Paket TikTok Marketing Strategy kami membantu brand Anda memanfaatkan popularitas TikTok untuk meningkatkan brand awareness dan engagement. Kami akan merancang dan mengimplementasikan strategi TikTok yang sesuai dengan target audiens Anda.",
      features: [
        "Setup dan optimasi akun TikTok",
        "Riset tren dan hashtag",
        "8 video TikTok per bulan",
        "Konsep kreatif untuk konten",
        "Editing video profesional",
        "Strategi hashtag challenge",
        "Kolaborasi dengan 1 micro-influencer",
        "Analisis performa konten",
      ],
      duration: "1 bulan",
      deliverables: "Video TikTok, laporan performa, strategi pertumbuhan",
    },
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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const productId = Number.parseInt(params.id)
      const foundProduct = productsData.find((p) => p.id === productId)

      if (foundProduct) {
        setProduct(foundProduct)

        // Find related products (same category)
        const related = productsData
          .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3)
        setRelatedProducts(related)
      } else {
        // Product not found, redirect to products page
        router.push("/products")
      }

      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id, router])

  const handleWhatsAppCheckout = () => {
    if (!product) return

    const message = `Halo, saya tertarik dengan layanan *${product.name}* dengan harga ${formatPrice(product.price)}. Mohon informasi lebih lanjut.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

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
        ) : product ? (
          <motion.div
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                className="mb-6 flex items-center gap-1 text-purple-800"
                onClick={() => router.push("/products")}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Layanan
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  {product.featured && <Badge className="absolute top-4 right-4 bg-purple-600">Featured</Badge>}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-purple-900 mb-2">{product.name}</h1>

                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                      ))}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>

                  <Badge variant="outline" className="mb-4 bg-purple-50">
                    {product.category}
                  </Badge>

                  <p className="text-gray-700 mb-6">{product.details.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Fitur Layanan</h3>
                    <ul className="grid gap-2">
                      {product.details.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Harga Layanan</p>
                      <p className="text-3xl font-bold text-purple-900">{formatPrice(product.price)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durasi</p>
                      <p className="font-medium">{product.details.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-purple-700 hover:bg-purple-800 flex-1"
                      onClick={handleWhatsAppCheckout}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Pesan via WhatsApp
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                      <Share2 className="mr-2 h-5 w-5" />
                      Bagikan
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="details" className="mb-12">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                  <TabsTrigger value="details">Detail Layanan</TabsTrigger>
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-purple-900 mb-4">Detail Layanan</h2>
                  <p className="text-gray-700 mb-6">{product.details.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">Fitur Layanan</h3>
                      <ul className="grid gap-2">
                        {product.details.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">Informasi Tambahan</h3>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="font-medium text-purple-700">Kategori</h4>
                          <p>{product.category}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-700">Durasi</h4>
                          <p>{product.details.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-700">Rating</h4>
                          <div className="flex items-center gap-1">
                            <span>{product.rating}</span>
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="deliverables" className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-purple-900 mb-4">Deliverables</h2>
                  <p className="text-gray-700 mb-6">
                    Berikut adalah deliverables yang akan Anda dapatkan dari layanan ini:
                  </p>

                  <div className="grid gap-4">
                    {product.details.deliverables.split(", ").map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 border border-purple-100 rounded-lg bg-purple-50"
                      >
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800">{item}</h4>
                          <p className="text-sm text-gray-600">Dikirimkan sesuai dengan timeline yang disepakati</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Layanan Terkait</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/products/${relatedProduct.id}`}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative">
                            <Image
                              src={relatedProduct.image || "/placeholder.svg"}
                              alt={relatedProduct.name}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{relatedProduct.description}</p>
                            <p className="font-bold text-purple-800">{formatPrice(relatedProduct.price)}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

