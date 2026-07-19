'use client'

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { HyperText } from "@/components/ui/hyper-text"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Spinner } from "@/components/ui/spinner"
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react"
import Link from "next/link"

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
  const [slides, setSlides] = useState<WaifuData['results']>([])
  const [loading, setLoading] = useState(true)

  async function fetchMore() {
    try {
      const res = await fetch('https://nekos.best/api/v2/waifu')
      const data: WaifuData = await res.json()
      setSlides(prev => {
        const existingUrls = new Set(prev.map(s => s.url))
        const newSlides = data.results.filter(s => !existingUrls.has(s.url))
        return [...prev, ...newSlides]
      })
      setLoading(false)
    } catch { }
  }

  useEffect(() => {
    fetchMore()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <DotPattern glow className="opacity-15" />

      <div className="fixed top-0 left-0 w-full z-50">
        <FloatingNav navItems={navItems} />
      </div>

      <section className="relative z-10 flex flex-col items-center gap-6 pt-40 pb-16 px-4 min-h-screen justify-center">
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
        <Link href={"/swipe"}>
          <Button
            size="lg"
          //          onClick={() =>
          //           document.getElementById('marquee')?.scrollIntoView({ behavior: 'smooth' })
          //        }
          >
            Get Swiping
          </Button>
        </Link>
      </section>

      <section id="marquee" className="relative z-10 w-full pb-32">
        {loading ? (
          <div className="flex justify-center py-32">
            <Spinner className="scale-150" />
          </div>
        ) : (
          <Marquee images={slides} />
        )}
      </section>
    </div>
  )
}

function Marquee({ images }: { images: WaifuData['results'] }) {
  const doubled = [...images, ...images]

  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex gap-4 animate-marquee w-max">
        {doubled.map((slide, i) => (
          <div
            key={`${slide.url}-${i}`}
            className="relative w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden border border-neutral-800"
          >
            <Image
              src={slide.url}
              alt={slide.artist_name}
              fill
              className="object-cover"
              sizes="192px"
              unoptimized
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-3">
              <p className="text-white text-xs font-medium truncate max-w-40">
                {slide.artist_name}
              </p>
            </div>
          </div>
        ))}
      </div>
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
