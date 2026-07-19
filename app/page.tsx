'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { HyperText } from "@/components/ui/hyper-text"
import { Button } from "@/components/ui/button"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Spinner } from "@/components/ui/spinner"
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

type WaifuImage = {
  url: string
  source_url: string
  artist_name: string
}

type WaifuData = {
  images: WaifuImage[]
}

export default function Home() {
  const [fetchStatus, setFetchStatus] = useState<"success" | "loading" | "failed">("loading")
  const [imgData, setImgData] = useState<WaifuImage>()
  const [nextImgData, setNextImgData] = useState<WaifuImage>()
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [swipeKey, setSwipeKey] = useState(0)

  const imageName = imgData?.artist_name ?? "loading"

  async function getImgData(fromSwipe = false) {
    try {
      const res = await fetch('https://waifu.im/api?size=small')
      const data: WaifuData = await res.json()
      setImgData(data.images[0])
      setFetchStatus("success")
      setSwipeDirection(null)
      if (fromSwipe) setSwipeKey(prev => prev + 1)
    } catch {
      setSwipeDirection(null)
      setFetchStatus("failed")
    }
  }

  async function getNextImgData() {
    try {
      const res = await fetch('https://waifu.im/api?size=small')
      const data: WaifuData = await res.json()
      setNextImgData(data.images[0])
      setImgData(prev => prev ?? data.images[0])
    } catch {}
  }

  useEffect(() => {
    getImgData()
    getNextImgData()
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") swipeLeft()
      if (e.key === "ArrowRight") swipeRight()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  function swipeLeft() {
    if (!swipeDirection) setSwipeDirection("left")
  }
  function swipeRight() {
    if (!swipeDirection) setSwipeDirection("right")
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <DotPattern glow className="opacity-15" />

      <div className="fixed top-0 left-0 w-full z-50">
        <FloatingNav navItems={navItems} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div
          key={swipeKey}
          initial={{ filter: "blur(2px)", scale: 0.25, opacity: 0 }}
          animate={
            swipeDirection === "right"
              ? { filter: "blur(0px)", scale: 1, opacity: 0, x: 600 }
              : swipeDirection === "left"
                ? { filter: "blur(0px)", scale: 1, opacity: 0, x: -600 }
                : { filter: "blur(0px)", scale: 1, opacity: 1, x: 0 }
          }
          transition={{ x: { duration: 0.15 }, opacity: { duration: 0.15 } }}
          drag="x"
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) setSwipeDirection("right")
            else if (info.offset.x < -100) setSwipeDirection("left")
            else setSwipeDirection(null)
          }}
          onAnimationComplete={() => {
            if (swipeDirection) {
              setImgData(nextImgData)
              getNextImgData()
              setSwipeKey(prev => prev + 1)
              setSwipeDirection(null)
            }
          }}
          dragSnapToOrigin={!swipeDirection}
          className="relative rounded-xl overflow-clip w-[85vw] max-w-[450px] aspect-[9/16]"
        >
          {fetchStatus === "loading" ? (
            <ImageSkeleton />
          ) : (
            <Image
              src={imgData?.url ?? ''}
              alt={imageName}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          <div className="inset-0 absolute bg-linear-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 m-5 text-white font-semibold">
            {imageName}
          </div>
        </motion.div>

        <motion.div
          initial={{ filter: "blur(2px)", x: -10, opacity: 0 }}
          animate={{ filter: "blur(0px)", x: 0, opacity: 1 }}
          className="w-full flex flex-row gap-2"
        >
          <Button onClick={swipeLeft} className="flex-1"><ArrowLeft /></Button>
          <Button onClick={swipeRight} className="flex-1"><ArrowRight /></Button>
        </motion.div>
      </div>
    </div>
  )
}

function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center rounded-xl">
      <Spinner className="scale-200" />
    </div>
  )
}

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  { name: "About", link: "#about", icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  { name: "Contact", link: "#contact", icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" /> },
]
