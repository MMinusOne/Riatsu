"use client";

import Logo from "@/components/assets/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaDiscord, FaRandom } from "react-icons/fa";
import { useRef } from "react";
import useThemeStore from "@/components/state/themeStore";

export default function Header() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const themeStore = useThemeStore();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    const searchInput = searchInputRef.current;
    if (!searchInput) return;
    const searchQuery = searchInput.value;
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`); // Directly use the search function
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    themeStore.setTheme(selectedTheme);
  };

  return (
    <>
      <div className="p-1 md:p-4 navbar">
        <div className="flex-1 gap-1 md:gap-4">
          <Link href="/" className="cursor-pointer">
            <Logo className="fill-primary-content" />
          </Link>
          <form onSubmit={handleSearch} className="join">
            <div>
              <input
                ref={searchInputRef}
                className="input-bordered w-32 md:w-72 input join-item"
                placeholder="Search"
                id="search"
              />
            </div>
            <div className="indicator">
              <button
                type="submit"
                className="btn btn-outline btn-secondary join-item"
              >
                Search <FaSearch />
              </button>
            </div>
          </form>
          <button className="md:flex hidden mx-2 btn btn-disabled btn-square disabled">
            <FaRandom />
          </button>
        </div>
        <div className="flex-none">
          <select
            onChange={handleThemeChange}
            className="select-bordered select"
            defaultValue={themeStore.theme}
          >
            <option value="black">Black</option>
            <option value="sunset">Sunset</option>
            <option value="nord">Nord</option>
            <option value="white">White</option>
          </select>
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
