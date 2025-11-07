import React from "react";
import Link from "next/link";
import { AiOutlineNodeCollapse } from "react-icons/ai";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export const FooterNav = () => {
  return (
    <footer className="  text-[#ececec] py-4">
      <div className="main-container border rounded-3xl border-[#7bdef252] py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <AiOutlineNodeCollapse size={40} color="#7bdff2" />
              <span className="text-xl font-semibold">EntropyFlow</span>
            </div>
            <p className="text-[#ececec]/70 max-w-md">
              Map your chronology, visualize moments as nodes along time. See
              connections, not chaos in your personal timeline.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/docs"
                  className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ececec]/70 hover:text-[#7bdff2] transition-colors"
              >
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#ececec]/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#ececec]/50 text-sm">
            © {new Date().getFullYear()} EntropyFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-[#ececec]/50 hover:text-[#7bdff2] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#ececec]/50 hover:text-[#7bdff2] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
