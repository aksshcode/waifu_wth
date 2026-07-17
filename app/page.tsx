import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HyperText } from "@/components/ui/hyper-text";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const res = await fetch("https://api.waifu.im/images?Nsfw=False&Width=1080&Height=1920")
  const data = await res.json()
  const imgUrl: string = data.items?.[0]?.url ?? "/placeholder.svg"
  const imgName: string = data.items?.[0]?.artists?.[0]?.name ?? "placeholder name"

  return (
    <div className="flex  pt-24 flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <Header />

      {/* image */}
      <div className="relative flex flex-col flex-1 w-full max-w-lg overflow-hidden">
        <Card className="relative flex-1 rounded-xl overflow-hidden bg-linear-to-t from-black/70 to-transparent">
          <Image
            src={imgUrl}
            alt="waifu image"
            fill
            className="object-cover"
            priority
          />
        </Card>
        <div className="absolute m-2 left-0 right-0 bottom-0">
          <span className="text-gray-500">Name: <span className="text-white">{imgName}</span></span>
        </div>
      </div>
      {/* <Button><ArrowRight /></Button> */}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="w-full absolute top-0 left-0 h-12">
      <div className="p-4 outline-1 outline-red-400 m-2 rounded-xl" style={{ backgroundColor: "#111" }}>
        <HyperText className="text-xl m-0 p-0">Waifu_WTF</HyperText>
      </div>
    </div>
  )
}
function Footer() {
  return (
    <div className="m-24 w-full bottom-0 left-0 h-auto flex justify-center items-center">
      <div className="bg-gray-700 flex justify-center items-center w-full h-16">
        hello there!
      </div>
    </div>
  )
}
