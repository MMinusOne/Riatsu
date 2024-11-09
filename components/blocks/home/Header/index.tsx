import NextImage from "next/image";
import { FaSearch, FaDiscord, FaRandom } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div className="p-4 navbar">
        <div className="flex-1 gap-4">
          <a>
            <NextImage
              src="/assets/logo_full.png"
              alt="Logo"
              width={142}
              height={57}
            />
          </a>
          <div className="join">
            <div>
              <div>
                <input
                  className="input-bordered w-72 input join-item"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="indicator">
              <button className="btn btn-outline btn-secondary join-item">
                Search <FaSearch />
              </button>
            </div>
          </div>
          <button className="btn btn-square">
            <FaRandom />
          </button>
          <div className="join join-vertical lg:join-horizontal">
            <button className="btn join-item">EN</button>
            <button className="btn join-item">JP</button>
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-secondary">
            Join Discord
            <FaDiscord />
          </button>
        </div>
      </div>
    </>
  );
}
