'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function RefreshBtn({ className = "" }) {
  return (
    <Button className={className}>new <ArrowRight /></Button>
  )
}
