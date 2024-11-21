"use client";

import Logo from "@/components/assets/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaDiscord,
  FaRandom,
  FaArrowDown,
  FaHamburger,
} from "react-icons/fa";
import { useRef, useState } from "react";
import useThemeStore from "@/components/state/themeStore";
import themes from "@/constants/themes";
import discordUrl from "@/constants/discord";

export default function Header() {
  const router = useRouter();
  const [searchEnabled, setSearchEnabled] = useState(false);
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
  const handleThemeChange = (theme: string) => {
    themeStore.setTheme(theme);
  };

  return (
    <>
      <div className="p-1 md:p-4 navbar">
        <div className="flex-1 gap-1 md:gap-4">
          <div className="block md:hidden dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <FaHamburger />
            </div>
            <ul
              tabIndex={0}
              className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm"
            >
              <li>
                <ThemeModal />
              </li>
              <li>
                <Link href={discordUrl} className="btn btn-ghost">
                  Join Discord
                  <FaDiscord />
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/" className="cursor-pointer">
            <Logo
              stroke={{ className: "fill-primary" }}
              text={{ className: "fill-primary-content" }}
            />
          </Link>
          <div className="md:flex hidden">
            <Search
              handleSearch={handleSearch}
              searchInputRef={searchInputRef}
            />
          </div>
          <button className="md:flex hidden mx-2 btn btn-disabled btn-square disabled">
            <FaRandom />
          </button>
        </div>
        <div className="flex-none">
          <ThemeDropdown handleThemeChange={handleThemeChange} />
          <Link
            href={discordUrl}
            className="md:flex hidden mx-3 btn btn-secondary"
          >
            Join Discord
            <FaDiscord />
          </Link>
          <button
            onClick={() => {
              setSearchEnabled(!searchEnabled);
              console.log(searchEnabled);
            }}
            className="flex md:hidden btn btn-outline btn-square"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      {searchEnabled ? (
        <>
          <div className="flex justify-center items-center md:hidden p-2 w-full">
            <Search
              handleSearch={handleSearch}
              searchInputRef={searchInputRef}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function ThemeDropdown(props: { handleThemeChange: (theme: string) => void }) {
  return (
    <>
      <div className="md:flex hidden dropdown">
        <div tabIndex={0} role="button" className="m-1 btn">
          Theme <FaArrowDown />
        </div>
        <ul
          tabIndex={0}
          className="z-[1] bg-base-100 shadow p-2 rounded-box w-52 dropdown-content menu"
        >
          {themes.map((theme) => (
            <li key={theme}>
              <a onClick={() => props.handleThemeChange(theme)}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
function ThemeModal() {
  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => {
          const themeModal = document.querySelector(
            "#theme_modal"
          ) as HTMLDialogElement;
          if (themeModal) {
            themeModal.showModal();
          }
        }}
      >
        open modal
      </button>
    </>
  );
}

interface SearchProps {
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

function Search({ handleSearch, searchInputRef }: SearchProps) {
  return (
    <>
      <form onSubmit={handleSearch} className="join">
        <div className="w-full md:w-auto">
          <input
            ref={searchInputRef}
            className="input-bordered w-full md:w-72 input join-item"
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
    </>
  );
}
