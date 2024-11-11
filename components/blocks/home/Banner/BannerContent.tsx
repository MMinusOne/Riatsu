import { IAnimeResult } from "@consumet/extensions";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export default function BannerContent(banner: IAnimeResult) {
  const router = useRouter();
  return (
    <>
      <div className="relative h-[200px] md:h-[400px] lg:h-[600px]">
        <div className="w-full h-full">
          <NextImage
            src={banner?.cover!}
            //@ts-ignore
            alt={`Banner ${banner.title.userPreferred}`}
            width={10000}
            height={10000}
            className="opacity-90 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
        </div>
        <div className="bottom-0 left-0 absolute flex flex-col gap-3 p-4 w-1/2 h-1/2">
          <span className="opacity-80 font-black text-3xl">
            {/**@ts-ignore */}
            {banner.title.userPreferred}
          </span>
          <span
            className="opacity-80 h-[100px] min-h-[100px] font-normal text-sm truncate"
            dangerouslySetInnerHTML={{ __html: banner.description }}
          ></span>
          <div className="flex justify-start items-center p-4">
            <button
              onClick={() => {
                router.push(`/wiki/${banner.id}`);
              }}
              className="bg-opacity-70 backdrop-blur-md w-1/4 btn btn-accent btn-outline"
            >
              <span className="text-primary-content">Watch Now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
