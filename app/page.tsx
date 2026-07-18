'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function Home() {
  type WaifuData = {
    results: {
      artist_name: string
      artist_href: string
      source_url: string
      url: string
      dimensions: { width: number; height: number }
    }[]
  }
  const [fetchStatus, setFetchStatus] = useState<"success" | "loading" | "failed">("loading")
  const [imgData, setImgData] = useState<WaifuData>()
  const imageData = imgData?.results[0]
  const imageName = imageData?.artist_name ?? "loading"
  async function getImgData() {
    try {
      const res = await fetch('https://nekos.best/api/v2/waifu')
      const data = await res.json()
      setImgData(data)
      setSwipeDirection(null)
      setFetchStatus("success")
    } catch {
      setSwipeDirection(null)
      setFetchStatus("failed")
    }
  }
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  useEffect(() => {
    getImgData()
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") swipeLeft()
      if (e.key === "ArrowRight") swipeRight()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  function swipeLeft() {
    if (!swipeDirection) {
      setSwipeDirection("left")
    }
  }
  function swipeRight() {
    if (!swipeDirection) {
      setSwipeDirection("right")
    }
  }
  return (
    <div className="w-full h-screen flex-1 flex flex-col justify-center p-4 items-center ">
      <div className="flex flex-col gap-4">
        <motion.div
          key={imageData?.url ?? "loading"}
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
              getImgData()
            }
          }}
          dragSnapToOrigin={!swipeDirection}
          className="relative rounded-xl overflow-clip w-[85vw] max-w-[450px] aspect-[9/16]">
          {fetchStatus === "loading" ? <ImageSkeleton /> :
            <Image
              src={imageData?.url ?? 'https://picsum.photos/seed/picsum/200/300'}
              alt="waifu image" fill className="object-cover" priority unoptimized />
          }
          <div className="inset-0 absolute bg-linear-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 m-5">
            {imageName}
          </div>
        </motion.div>
        <motion.div
          initial={{ filter: "blur(2px)", x: -10, opacity: 0 }}
          animate={{ filter: "blur(0px)", x: 0, opacity: 1 }}
          className="w-full flex-row flex"
        >
          <Button onClick={swipeLeft} className="m-1 w-auto flex-1"><ArrowLeft /></Button>
          <Button onClick={swipeRight} className="m-1 w-auto flex-1"><ArrowRight /></Button>
        </motion.div>
      </div>
    </div >
  )
}

function ImageSkeleton() {
  return (
    <div
      className="w-full h-full bg-[#0a0a0a] rounded-xl"
    >
      <Spinner data-icon="inline-start" />
    </div>
  )
}
