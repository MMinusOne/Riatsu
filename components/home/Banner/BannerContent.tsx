import { IAnimeResult } from "@consumet/extensions";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export default function BannerContent(bannerData: IAnimeResult) {
  const router = useRouter();

  return (
    <>
      <div className="relative h-[300px] lg:h-[600px]">
        <div className="w-full h-full">
          <NextImage
            src={bannerData?.banner!}
            //@ts-ignore
            alt={`Banner ${bannerData.title}`}
            width={10000}
            height={10000}
            className="opacity-90 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
        </div>
        <div className="bottom-0 left-0 absolute flex flex-col gap-3 p-4 w-full md:w-1/2 h-1/2">
          <span className="opacity-80 font-black text-lg text-start md:text-center md:text-3xl truncate">
            {/**@ts-ignore */}
            {bannerData.title}
          </span>
          <span
            className="md:block hidden opacity-80 m-2 h-[100px] min-h-[100px] font-normal text-sm text-start truncate whitespace-normal"
            dangerouslySetInnerHTML={{ __html: bannerData.description }}
          ></span>
          <div className="flex justify-start items-center py-3 md:py-0 p-0 md:p-4">
            <button
              onClick={() => {
                router.push(`/watch/anime/${bannerData.id}`);
              }}
              className="bg-opacity-70 backdrop-blur-md w-1/2 md:w-1/4 btn btn-accent btn-outline glass"
            >
              <span className="text-primary-content">Watch Now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
