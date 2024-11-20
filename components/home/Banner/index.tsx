import { IAnimeResult } from "@consumet/extensions";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ms from "ms";
import BannerContent from "./BannerContent";

export default function Banner(props: { data: IAnimeResult[] }) {
  const [banners, setBanners] = useState<IAnimeResult[]>([]);

  useEffect(() => {
    const newBanners: IAnimeResult[] = [];
    for (const animeResult of props.data) {
      if (animeResult.banner) {
        const img = new Image();
        img.src = animeResult.banner;
        img.onload = () => {
          // if (img.height === 400) {
          newBanners.push(animeResult);
          setBanners(newBanners);
          // }
        };
      }
    }
  }, [props.data]);

  return (
    <>
      <div className="relative w-full h-[200px] md:h-[400px] lg:h-[600px]">
        {banners.length > 0 && (
          <Carousel
            showArrows={false} // Disable swipe left and right buttons
            infiniteLoop={true}
            autoPlay={true}
            interval={ms("3s")}
            showIndicators={false}
            emulateTouch
            swipeable={false}
            showStatus={false}
            className="h-[inherit]"
          >
            {banners.map((banner: IAnimeResult, index) => {
              return <BannerContent {...banner} key={index} />;
            })}
          </Carousel>
        )}
      </div>
    </>
  );
}
