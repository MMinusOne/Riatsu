"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaDiscord, FaRandom } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="p-1 md:p-4 navbar">
        <div className="flex-1 gap-1 md:gap-4">
          <Link href="/" className="cursor-pointer">
            <NextImage
              src="/assets/logo_full.png"
              alt="Logo"
              width={142}
              height={57}
            />
          </Link>
          <div className="join">
            <div>
              <div>
                <input
                  className="input-bordered w-32 md:w-72 input join-item"
                  placeholder="Search"
                  id="search"
                />
              </div>
            </div>
            <div className="indicator">
              <button
                onClick={() => {
                  const searchInput = document.querySelector(
                    "#search"
                  ) as HTMLInputElement;
                  if (!searchInput) return;
                  const searchQuery = searchInput?.value;
                  if (!searchQuery) return;
                  router.push(`/search?q=${searchQuery}`);
                }}
                className="btn btn-outline btn-secondary join-item"
              >
                Search <FaSearch />
              </button>
            </div>
          </div>
          <button className="md:flex hidden mx-2 btn btn-disabled btn-square disabled">
            <FaRandom />
          </button>
        </div>
        <div className="flex-none">
          <Link
            href="https://discord.gg/DyR6ZStnTN"
            className="mx-3 btn btn-secondary"
          >
            Join Discord
            <FaDiscord />
          </Link>
        </div>
      </div>
    </>
  );
}
