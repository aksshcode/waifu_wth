'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

const cards = [
  { "url": "https://nekos.best/api/v2/waifu/b74529e0-2e8b-4652-80f8-d4aace4e1b32.png", "artist": "Shinka" },
  { "url": "https://nekos.best/api/v2/waifu/a81999e9-292e-4a29-b048-a1311830d774.png", "artist": "華葡。" },
  { "url": "https://nekos.best/api/v2/waifu/bb289ba3-1593-4b06-92eb-1b117f25fe44.png", "artist": "Shotz" },
  { "url": "https://nekos.best/api/v2/waifu/6cf56c32-9c77-4640-853c-7225e9daa7dc.png", "artist": "TELU" },
  { "url": "https://nekos.best/api/v2/waifu/e3b31722-95c1-4e3f-8d58-3ad67d4e6c54.png", "artist": "Rudae" },
  { "url": "https://nekos.best/api/v2/waifu/934b4a77-2290-45a1-98ca-e777759deccf.png", "artist": "とぴあ" }, { "url": "https://nekos.best/api/v2/waifu/28cafa23-479a-44b2-9ffa-2ca36cadae22.png", "artist": "TorinoAqua" }, { "url": "https://nekos.best/api/v2/waifu/95412222-64e4-493d-a9dc-73f5a0546ac8.png", "artist": "北乃ゆきと" },
  { "url": "https://nekos.best/api/v2/waifu/3726a151-f8fe-4a69-abaf-7272e4037829.png", "artist": "oshioshio_info" },
  { "url": "https://nekos.best/api/v2/waifu/63b571f4-a198-4460-b476-23c3edf02a14.png", "artist": "なきょ" },
  { "url": "https://nekos.best/api/v2/waifu/968dc6da-e2fb-49ff-ad0d-49e6ad73e967.png", "artist": "riannu" },
  { "url": "https://nekos.best/api/v2/waifu/955f6299-aaac-4489-8695-6a4808210b53.png", "artist": "かがちさく" },
  { "url": "https://nekos.best/api/v2/waifu/e9b95142-3ae2-46cc-a922-e286d8f53d3c.png", "artist": "おゆわり" },
  { "url": "https://nekos.best/api/v2/waifu/558bea27-e157-40cc-a2d8-ef71eea4468a.png", "artist": "E20" },
  { "url": "https://nekos.best/api/v2/waifu/bb51637f-9c9a-453f-963d-711359d5e287.png", "artist": "JsnGoat" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="mx-auto flex sm:max-w-5xl  flex-col px-10 pt-40 p-24 max-w-xl">
        <span className="text-6xl font-black tracking-tight">
          who needs girls when you have waifus?
        </span>

        <span className="mt-3 text-xl text-neutral-400">
          Swipe forever. Discover smth new ,every time.
        </span>

        <Link href={'/swipe'}>
          <Button className="mt-8 w-fit">
            Start swiping
          </Button>
        </Link>
      </section>

      <div className="overflow-hidden py-10">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...cards, ...cards].map((card, i) => (
            <div key={i} className="relative min-w-[200px] aspect-[9/16] rounded-xl overflow-clip shrink-0">
              <Image src={card.url} alt={card.artist} fill className="object-cover" unoptimized />
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 w-screen top-0 z-50 px-8 mx-auto">
      <div className="mx-auto flex h-16 w-5/5 max-w-5xl items-center justify-between px-4 outline-1 outline-white/10 rounded-xl mt-4 bg-neutral-950/60 backdrop-blur-xl">
        <Image
          src="/waifu.png"
          alt="Waifu"
          width={125}
          height={125}
          className="-mb-3"
        />

        <Link href={'/swipe'}>
          <Button ><span className="font-bold text-xl">
            Start swiping</span></Button>
        </Link>
      </div>
    </header>
  )
}
