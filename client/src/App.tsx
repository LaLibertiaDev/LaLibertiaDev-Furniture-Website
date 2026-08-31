import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

/* Quiet Gallery shell: the same walnut mark + serif lockup anchors both hero and catalogue contexts. */
const mark = "/images/lalibertia-mark.png";
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const nav = [["Shop", "/shop"], ["Collections", "/collections"], ["About", "/about"], ["Journal", "/journal"], ["Contact", "/contact"]];
  const tone = isHome ? "text-[#f8f3ea]" : "text-[#1d1b18]";
  const border = isHome ? "border-white/25" : "border-[#d8d0c4]";
  return <>
    <header className={`absolute top-0 z-30 w-full ${tone}`}>
      <div className={`container flex h-[78px] items-center justify-between border-b ${border}`}>
        <Link href="/" className="flex items-center gap-3" aria-label="LaLibertia home">
          <img src={mark} alt="" className={`size-7 object-contain ${isHome ? "brightness-0 invert" : ""}`} />
          <span className="display-serif text-[25px] tracking-[-.04em]">LaLibertia</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} href={href} className={`text-[11px] tracking-[.1em] uppercase transition-opacity hover:opacity-60 ${location === href ? "opacity-100" : "opacity-80"}`}>{label}</Link>)}</nav>
        <div className="flex items-center gap-1">
          <Link href="/search" className="grid size-10 place-items-center hover:bg-black/5" aria-label="Search"><Search size={17} strokeWidth={1.5} /></Link>
          <Link href="/wishlist" className="hidden size-10 place-items-center hover:bg-black/5 sm:grid" aria-label="Wishlist"><Heart size={17} strokeWidth={1.5} /></Link>
          <Link href="/cart" className="grid size-10 place-items-center hover:bg-black/5" aria-label="Cart"><ShoppingBag size={17} strokeWidth={1.5} /></Link>
          <button onClick={() => setOpen(true)} className="grid size-10 place-items-center lg:hidden" aria-label="Open menu"><Menu size={19} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 bg-[#f7f4ee] text-[#1d1b18] lg:hidden">
      <div className="container flex h-[78px] items-center justify-between border-b border-[#d8d0c4]"><Link onClick={() => setOpen(false)} href="/" className="flex items-center gap-3"><img src={mark} alt="" className="size-7"/><span className="display-serif text-[25px]">LaLibertia</span></Link><button onClick={() => setOpen(false)} className="grid size-10 place-items-center" aria-label="Close menu"><X size={20} /></button></div>
      <nav className="container flex flex-col gap-7 py-16" aria-label="Mobile navigation">{nav.map(([label, href], i) => <Link onClick={() => setOpen(false)} key={href} href={href} className="display-serif text-5xl fade-up" style={{ animationDelay: `${i * 40}ms` }}>{label}<span className="ml-3 align-middle text-base wood">↗</span></Link>)}</nav>
      <div className="container mt-auto border-t border-[#d8d0c4] py-6 text-xs text-[#766c60]">A quieter way to furnish the room.</div>
    </div>}
  </>;
}
function PageFrame({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-[#f7f4ee] text-[#1d1b18]"><SiteHeader />{children}<footer className="bg-[#1d1b18] py-16 text-[#f7f4ee]"><div className="container"><div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><div className="flex items-center gap-3"><img src={mark} alt="" className="size-7 brightness-0 invert"/><div className="display-serif text-3xl">LaLibertia</div></div><p className="mt-4 max-w-xs text-sm leading-7 text-[#bab1a5]">Furniture crafted with intention, materials chosen with care, and designed to be lived in.</p></div><div><div className="eyebrow !text-[#b9aa98]">Explore</div><div className="mt-5 grid gap-3 text-sm text-[#d6cec3]"><Link href="/shop">Shop all</Link><Link href="/collections">Collections</Link><Link href="/journal">Journal</Link></div></div><div><div className="eyebrow !text-[#b9aa98]">Company</div><div className="mt-5 grid gap-3 text-sm text-[#d6cec3]"><Link href="/about">Our story</Link><Link href="/contact">Contact</Link><span>Trade program</span></div></div><div><div className="eyebrow !text-[#b9aa98]">Visit</div><p className="mt-5 text-sm leading-7 text-[#d6cec3]">12 Mercer Street<br/>London W1D 3QF<br/>By appointment</p></div></div><div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.14em] text-[#938b80] sm:flex-row"><span>© 2026 LaLibertia Studio</span><span>Privacy · Terms · Shipping</span></div></div></footer></div> }
function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><PageFrame><Home /></PageFrame></TooltipProvider></ThemeProvider></ErrorBoundary> }
export default App;
