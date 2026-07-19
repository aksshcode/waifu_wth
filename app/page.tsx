import { Card } from "@/components/ui/card";
import { FloatingNav } from "@/components/ui/floating-navbar"
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="w-screen flex flex-col justify-start items-center gap-2 h-sccren flex-1 bg-gray-900">
      <Header />
      <Card className="p-4 w-1/2">haro there</Card>
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
];
function Header() {
  return (
    <div className="relative mt-6 top-0 mb-24 w-full translate-z-0">
      <FloatingNav className="absolute top-0 left-0 " navItems={navItems} />
    </div>
  )
}
