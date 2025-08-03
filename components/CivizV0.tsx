"use client"

import { useState, useEffect, useRef } from "react"
import ViewToggle from './ViewToggle';
import VisionCollage from './VisionCollage';
import VisionForm from './VisionForm';
import FundingCategories from './FundingCategories';
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import {
  Heart,
  Users,
  TreePine,
  Building,
  GraduationCap,
  Shield,
  Zap,
  Coins,
  Menu,
  X,
  TrendingUp,
  Gift,
} from "lucide-react"
import Image from "next/image"

const civicCategories = [
  {
    title: "Housing & Development",
    icon: Building,
    color: "bg-blue-500",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Environment & Parks",
    icon: TreePine,
    color: "bg-green-500",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Education & Youth",
    icon: GraduationCap,
    color: "bg-purple-500",
    image: "/placeholder.svg?height=200&width=300",
  },
  { title: "Public Safety", icon: Shield, color: "bg-red-500", image: "/placeholder.svg?height=200&width=300" },
  { title: "Transportation", icon: Zap, color: "bg-yellow-500", image: "/placeholder.svg?height=200&width=300" },
  { title: "Healthcare Access", icon: Heart, color: "bg-pink-500", image: "/placeholder.svg?height=200&width=300" },
  {
    title: "Economic Development",
    icon: TrendingUp,
    color: "bg-indigo-500",
    image: "/placeholder.svg?height=200&width=300",
  },
  { title: "Community Services", icon: Users, color: "bg-teal-500", image: "/placeholder.svg?height=200&width=300" },
  {
    title: "Digital Infrastructure",
    icon: Zap,
    color: "bg-orange-500",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Civizv0() {
  const [userPoints, setUserPoints] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [vision, setVision] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleVisionSubmit = () => {
    if (vision.trim()) {
      setUserPoints((prev) => prev + 50)
      setVision("")
      // Here you would typically submit to your backend
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CIVIZ
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#impact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Impact
              </a>
              <a href="#vision" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Vision
              </a>
              <a href="#community" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Community
              </a>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
                <Coins className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-600">{(12345).toLocaleString()}</span>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Tight 3x3 Civic Impact Collage */}
      <section className="py-12">
        <ViewToggle />
        <VisionCollage />
      </section>
      {/* Floating Title Text */}
      <div
        className="fixed inset-x-0 z-40 px-4 pointer-events-none"
        style={{
          top: `${Math.max(120, 200 - scrollY * 0.3)}px`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg transition-opacity duration-300">
            Share Your Vision for
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              {" "}
              San Francisco
            </span>
          </h2>
        </div>
      </div>

      {/* Dynamic Growing Input Field */}
      <div
        className="fixed inset-x-0 z-40 px-4 pointer-events-none"
        style={{
          top: `${Math.max(180, 280 - scrollY * 0.4)}px`,
        }}
      >
        <VisionForm />
      </div>

      {/* Floating Points Indicator */}
      <div
        className={`fixed z-40 pointer-events-none transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: `${Math.max(260, 360 - scrollY * 0.5)}px`,
          left: "20px",
        }}
      >
        <div className="pointer-events-auto">
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-xl">
            <Gift className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">+50 pts</span>
          </div>
        </div>
      </div>

      {/* Floating Submit Button */}
      <div
        className={`fixed z-40 pointer-events-none transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: `${Math.max(260, 360 - scrollY * 0.5)}px`,
          right: "20px",
        }}
      >
        <div className="pointer-events-auto">
          console.log("VISION IS", vision);
          <Button
            onClick={handleVisionSubmit}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl transition-all"
            disabled={!vision.trim()}
          >
            Submit Vision
          </Button>
        </div>
      </div>

      {/* Spacer for when elements are in normal flow */}
      <div className="h-8" style={{ marginTop: scrollY > 400 ? "0" : "50px" }} />

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#impact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Impact
              </a>
              <a href="#vision" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Vision
              </a>
              <a href="#community" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Community
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="impact" className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-slate-600">
            We are making a positive impact in our community by focusing on various civic categories.
          </p>
        </section>

        <section id="community" className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Community Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {civicCategories.map((category, index) => (
              <Card key={index} className={`bg-white ${category.color}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="w-6 h-6 text-white" />
                    <span className="text-white">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={300}
                    height={200}
                    className="mb-4"
                  />
                  <p className="text-lg text-slate-600">
                    We are committed to improving {category.title.toLowerCase()} in our community.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="py-12 bg-black/10">
          <FundingCategories />
        </section>
        <footer className="bg-black/30 backdrop-blur-md py-8 px-4">
         <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="text-sm">
            © 2024 CIVIZ — Empowering civic engagement through visualization
          </p>
        </div>
      </footer>
      </main>
    </div>
  )
}
