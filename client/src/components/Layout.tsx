import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, MapPin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "ホーム" },
    { href: "/about", label: "agoについて" },
    { href: "/menu", label: "メニュー" },
    { href: "/staff", label: "スタッフ" },
    { href: "/access", label: "アクセス" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled || isMobileMenuOpen
            ? "bg-background/90 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <a className="z-50 relative group">
              <h1 className={cn(
                "font-serif text-2xl tracking-widest transition-colors duration-300",
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-foreground" // Always visible
              )}>
                ago
                <span className="block text-[10px] tracking-[0.3em] font-sans opacity-70 group-hover:opacity-100 transition-opacity">
                  MASSAGE & RELAX
                </span>
              </h1>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "text-sm tracking-widest hover:text-primary/70 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  location === link.href ? "text-primary after:w-full" : "text-muted-foreground"
                )}>
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/booking">
              <a className="ml-4 inline-flex items-center justify-center px-6 py-2 border border-primary/20 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-sm tracking-wider font-medium">
                ご予約
              </a>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <a 
                className="font-serif text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/booking">
            <a className="mt-8 inline-block rounded-full px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 tracking-widest font-medium">
              オンライン予約
            </a>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 pt-20 pb-10 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl tracking-widest">ago</h2>
              <p className="text-muted-foreground text-sm leading-loose">
                静寂の中で、心と体を解き放つ。<br />
                あなただけの特別な時間を、<br />
                ここ「ago」で。
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg tracking-wider mb-4">Information</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-0.5" />
                  <span>〒107-0062<br />東京都港区南青山5-1-1<br />青南ビル 3F</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0" />
                  <span>03-1234-5678</span>
                </li>
                <li>
                  <span className="block mb-1">営業時間</span>
                  11:00 - 21:00 (最終受付 20:00)
                </li>
                <li>
                  <span className="block mb-1">定休日</span>
                  火曜日・年末年始
                </li>
              </ul>
            </div>

            {/* Links */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg tracking-wider mb-4">Menu</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/menu"><a className="hover:text-primary transition-colors">ボディケア</a></Link></li>
                <li><Link href="/menu"><a className="hover:text-primary transition-colors">アロマオイルトリートメント</a></Link></li>
                <li><Link href="/menu"><a className="hover:text-primary transition-colors">ヘッドスパ</a></Link></li>
                <li><Link href="/menu"><a className="hover:text-primary transition-colors">リフレクソロジー</a></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground tracking-wider">
            &copy; {new Date().getFullYear()} ago Massage & Relaxation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
