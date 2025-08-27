import { Eye } from "./Eye";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--cream-background)] border-t border-[var(--cookie-monster-blue)]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <Eye className="!size-8" isRightEye={false} />
                <Eye className="!size-8" isRightEye={true} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--cookie-monster-blue)]">CS Portfolio</h3>
                <p className="text-sm text-gray-600">Computer Science Student at Egerton University</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-600 mb-2">
                © {currentYear} Computer Science Portfolio. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 flex items-center justify-center md:justify-end gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and lots of code
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--cookie-monster-blue)]/10 text-center">
            <p className="text-xs text-gray-500">
              Interactive eyes design inspired by creative programming • Built with React, TypeScript & Tailwind CSS
            </p>
            <div className="mt-2">
              <p className="text-[10px] text-gray-400">
                Thank you to{" "}
                <a
                  href="https://www.linkedin.com/in/faelpt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80 transition-opacity"
                >
                  Rafael Serra
                </a>{" "}
                for the original eye design inspiration
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}