import { Rocket } from 'lucide-react'

import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b-[1px] px-8 py-3">
      <div className="flex items-center justify-center gap-4">
        <Rocket className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <span className="text-xl">Início</span>
      </div>
      <ThemeToggle />
    </header>
  )
}
