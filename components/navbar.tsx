"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github,
  Home,
  Instagram,
  Menu,
  Search,
  ShoppingCart,
  Twitter,
  Zap,
  X,
  Mail,
  Users,
  ChevronDown,
  Star,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface NavbarProps {
  cartCount: number
  handleCheckout: () => void
  visitorCount: number
}

export default function Navbar({ cartCount, handleCheckout, visitorCount }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString()

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery)
      // Close search bar
      setIsSearchOpen(false)
      // Navigate to products page with search query
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Navigation items with active handlers
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-4 w-4" />,
      onClick: () => router.push("/"),
      dropdown: null,
    },
    {
      name: "Products",
      path: "/products",
      icon: <ShoppingCart className="h-4 w-4" />,
      onClick: () => router.push("/products"),
      dropdown: "products",
    },
    {
      name: "About Us",
      path: "/about",
      icon: <Users className="h-4 w-4" />,
      onClick: () => router.push("/about"),
      dropdown: null,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <Mail className="h-4 w-4" />,
      onClick: () => router.push("/contact"),
      dropdown: null,
    },
  ]

  // Dropdown menus
  const dropdowns = {
    products: [
      { name: "Social Media", path: "/products?category=Social Media", icon: <Instagram className="h-4 w-4" /> },
      { name: "SEO", path: "/products?category=SEO", icon: <Star className="h-4 w-4" /> },
      { name: "Content", path: "/products?category=Content", icon: <Mail className="h-4 w-4" /> },
      { name: "Advertising", path: "/products?category=Advertising", icon: <Bell className="h-4 w-4" /> },
    ],
  }

  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-4 w-4" />, url: "https://github.com/vynnoxrzy" },
    { name: "Instagram", icon: <Instagram className="h-4 w-4" />, url: "https://instagram.com/vynnoxrzy" },
    { name: "Twitter", icon: <Twitter className="h-4 w-4" />, url: "https://twitter.com/vynnoxrzy" },
  ]

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-purple-900/95 to-blue-900/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Zap className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </div>
              <span className="font-bold text-xl">Vynnox Rzy</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Nav Links */}
            <div className="flex items-center space-x-2 mr-4">
              {navItems.map((item) => (
                <div key={item.path} className="relative" ref={item.dropdown ? dropdownRef : undefined}>
                  {item.dropdown ? (
                    <div>
                      <Button
                        variant={pathname === item.path ? "default" : "ghost"}
                        size="sm"
                        className={`${
                          pathname === item.path
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "text-white/70 hover:text-white"
                        } flex items-center gap-1`}
                        onClick={() => toggleDropdown(item.dropdown!)}
                      >
                        {item.icon}
                        <span className="mx-1">{item.name}</span>
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${
                            activeDropdown === item.dropdown ? "rotate-180" : ""
                          }`}
                        />
                      </Button>

                      <AnimatePresence>
                        {activeDropdown === item.dropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gradient-to-r from-purple-800 to-blue-800 ring-1 ring-black ring-opacity-5 z-50"
                          >
                            <div className="py-1">
                              {dropdowns[item.dropdown as keyof typeof dropdowns].map((dropdownItem, idx) => (
                                <Link
                                  key={idx}
                                  href={dropdownItem.path}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {dropdownItem.icon}
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Button
                      variant={pathname === item.path ? "default" : "ghost"}
                      size="sm"
                      className={
                        pathname === item.path ? "bg-purple-500 hover:bg-purple-600" : "text-white/70 hover:text-white"
                      }
                      onClick={item.onClick}
                    >
                      {item.icon}
                      <span className="ml-1">{item.name}</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-1 mr-4 border-l border-white/10 pl-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title={link.name}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="flex items-center gap-1 text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>Time:</span>
              <motion.span
                key={formattedTime}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono bg-white/10 px-2 py-1 rounded"
              >
                {formattedTime}
              </motion.span>
            </motion.div>

            <motion.div
              className="flex items-center gap-1 text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>Visitors:</span>
              <motion.span
                key={visitorCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="font-mono bg-white/10 px-2 py-1 rounded"
              >
                {visitorCount.toLocaleString()}
              </motion.span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <Button
                variant="outline"
                className="bg-white/10 border-none hover:bg-white/20"
                onClick={handleCheckout}
                disabled={cartCount === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Button>
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 border-none hover:bg-white/20"
                onClick={handleCheckout}
                disabled={cartCount === 0}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {cartCount}
                </motion.span>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-br from-purple-900 to-blue-900 text-white border-l border-white/10"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-yellow-300" />
                      <span className="font-bold text-xl">Vynnox Rzy</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <div key={item.path}>
                          {item.dropdown ? (
                            <div className="space-y-2">
                              <Button
                                variant={pathname === item.path ? "default" : "ghost"}
                                className={`w-full justify-between ${
                                  pathname === item.path
                                    ? "bg-purple-500 hover:bg-purple-600"
                                    : "bg-white/10 hover:bg-white/20"
                                }`}
                                onClick={() => toggleDropdown(item.dropdown!)}
                              >
                                <div className="flex items-center">
                                  {item.icon}
                                  <span className="ml-2">{item.name}</span>
                                </div>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    activeDropdown === item.dropdown ? "rotate-180" : ""
                                  }`}
                                />
                              </Button>

                              <AnimatePresence>
                                {activeDropdown === item.dropdown && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden pl-4"
                                  >
                                    {dropdowns[item.dropdown as keyof typeof dropdowns].map((dropdownItem, idx) => (
                                      <Button
                                        key={idx}
                                        variant="ghost"
                                        className="w-full justify-start bg-white/5 hover:bg-white/10 mb-1"
                                        onClick={() => {
                                          setActiveDropdown(null)
                                          router.push(dropdownItem.path)
                                        }}
                                      >
                                        {dropdownItem.icon}
                                        <span className="ml-2">{dropdownItem.name}</span>
                                      </Button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Button
                              variant={pathname === item.path ? "default" : "ghost"}
                              className={`w-full justify-start ${
                                pathname === item.path
                                  ? "bg-purple-500 hover:bg-purple-600"
                                  : "bg-white/10 hover:bg-white/20"
                              }`}
                              onClick={item.onClick}
                            >
                              {item.icon}
                              <span className="ml-2">{item.name}</span>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Social Links (Mobile) */}
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-sm font-medium mb-2">Connect With Us</h3>
                      <div className="flex space-x-2">
                        {socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 text-white/70 hover:text-white rounded-full transition-colors"
                            title={link.name}
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Time:</span>
                        <span className="font-mono bg-white/10 px-2 py-1 rounded">{formattedTime}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span>Visitors:</span>
                        <span className="font-mono bg-white/10 px-2 py-1 rounded">{visitorCount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <form onSubmit={handleSearch}>
                          <Input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 bg-white/10 backdrop-blur-sm border-none text-white placeholder:text-gray-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </form>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Button
                        className="w-full bg-white/10 hover:bg-white/20"
                        onClick={handleCheckout}
                        disabled={cartCount === 0}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Cart ({cartCount})
                      </Button>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10 text-center text-sm text-white/60">
                    <p>Created with by Vynnox Rzy 🚀</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-3 flex items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <form onSubmit={handleSearch}>
                    <Input
                      type="text"
                      placeholder="Search for services..."
                      className="pl-10 bg-white/10 backdrop-blur-sm border-none text-white placeholder:text-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </form>
                </div>
                <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

