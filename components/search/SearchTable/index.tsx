import { IAnimeResult } from "@consumet/extensions";
import ContentCard from "../ContentCard";

export default function SearchTable(props: {
  type: "anime" | "movie" | "manga";
  data: IAnimeResult[];
}) {
  return (
    <>
      <div
        key="search-table"
        className="md:flex flex-wrap justify-center items-center place-items-center gap-x-4 gap-y-3 grid grid-cols-2 p-4 w-full h-fit"
      >
        {props?.data?.map((cardInfo, cardIndex) => {
          return (
            <>
              <ContentCard
                {...cardInfo}
                cardType={props.type}
                key={cardIndex}
              />
            </>
          );
        })}
      </div>
    </>
  );
}
