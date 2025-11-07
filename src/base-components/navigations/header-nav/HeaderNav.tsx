import Button from "@/components/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineNodeCollapse, AiOutlineNodeExpand } from "react-icons/ai";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export const HeaderNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`
      sticky top-2 z-50 mt-10
      transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? "bg-[#0f1014]/40 backdrop-blur-xs shadow-lg"
          : "bg-transparent animate-[glowPulse_4s_ease-in-out_infinite]"
      }
      ${isMenuOpen ? "bg-[#0f1014]" : ""}
      border border-[#7bdef252] main-container px-4 rounded-3xl
    `}
    >
      <div className=" flex items-center justify-between py-4 relative">
        {/* Logo */}
        <div className="logo flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* <AiOutlineNodeCollapse size={32} color="#7bdff2" /> */}
            <AiOutlineNodeExpand size={32} color="#7bdff2" />
            <span className="text-[#ececec] text-base md:text-lg font-semibold">
              Entropy
              <span className="text-[#7bdff2] text-shadow-[0_0_15px_#7bdff2]">
                Flow
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-[#ececec]">
          <Link
            href="/"
            className="text-sm md:text-base hover:text-[#7bdff2] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm md:text-base hover:text-[#7bdff2] transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-sm md:text-base hover:text-[#7bdff2] transition-colors"
          >
            <Button size="sm">Get started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#ececec] p-2 hover:bg-[#1fb8d9]/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-[#0f1014]/80 backdrop-blur-xs border border-[#7bdef252] rounded-xl overflow-hidden md:hidden shadow-lg">
            <div className="flex flex-col text-[#ececec]/90">
              <Link
                href="/"
                className="px-6 py-4 hover:bg-[#1fb8d9]/10 transition-all duration-300 text-sm backdrop-blur-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-6 py-4 hover:bg-[#1fb8d9]/10 transition-all duration-300 text-sm backdrop-blur-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/"
                className="text-sm md:text-base m-2 hover:text-[#7bdff2] transition-colors"
              >
                <Button size="sm" className="w-full rounded-lg!">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
