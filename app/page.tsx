'use client'

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { DotPattern } from "@/components/ui/dot-pattern"
import { HyperText } from "@/components/ui/hyper-text"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Spinner } from "@/components/ui/spinner"
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type WaifuData = {
  results: {
    artist_name: string
    artist_href: string
    source_url: string
    url: string
    dimensions: { width: number; height: number }
  }[]
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [slides, setSlides] = useState<WaifuData['results']>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  async function fetchMore() {
    try {
      const res = await fetch('https://nekos.best/api/v2/waifu')
      const data: WaifuData = await res.json()
      setSlides(prev => [...prev, ...data.results])
      setLoading(false)
    } catch {}
  }

  useEffect(() => {
    fetchMore()
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    if (slides.length - emblaApi.selectedScrollSnap() < 4) {
      fetchMore()
    }
  }, [emblaApi, slides.length])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect)
      onSelect()
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <DotPattern glow className="opacity-15" />

      <div className="fixed top-0 left-0 w-full z-50">
        <FloatingNav navItems={navItems} />
      </div>

      <section className="relative z-10 flex flex-col items-center gap-6 pt-40 pb-16 px-4">
        <HyperText
          as="h1"
          className="text-5xl md:text-7xl font-bold text-center bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent"
          duration={1000}
        >
          Discover Waifus
        </HyperText>
        <p className="text-lg text-neutral-400 text-center max-w-md">
          Infinite waifus. Zero wait. Every swipe is pre-loaded.
        </p>
        <Button
          size="lg"
          onClick={() =>
            document.getElementById('carousel')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Get Swiping
        </Button>
      </section>

      <section
        id="carousel"
        className="relative z-10 w-full max-w-lg px-4 pb-32"
      >
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800">
          <div ref={emblaRef}>
            <div className="flex">
              {loading ? (
                <div className="flex-[0_0_100%] min-w-0 aspect-[9/16] bg-neutral-900 flex items-center justify-center rounded-2xl">
                  <Spinner className="scale-150" />
                </div>
              ) : (
                slides.map((slide) => (
                  <div
                    key={slide.url}
                    className="flex-[0_0_100%] min-w-0 relative aspect-[9/16]"
                  >
                    <Image
                      src={slide.url}
                      alt={slide.artist_name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="text-white font-semibold text-lg">
                        {slide.artist_name}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {slides.length > 0 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === selectedIndex
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    )}
                    onClick={() => emblaApi?.scrollTo(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
]
