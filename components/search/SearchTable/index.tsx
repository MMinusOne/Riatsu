import { IAnimeResult } from "@consumet/extensions";
import { ContentCard } from "../../misc/ContentCard/ContentCard";

export default function SearchTable(props: {
  type: "anime" | "movie" | "manga";
  data: IAnimeResult[];
}) {
  return (
    <>
      <div key="search-table" className="place-items-center gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 w-full h-fit">
        {props?.data?.map((cardInfo, cardIndex) => {
          return (
            <div className="transform transition-transform hover:scale-105" key={cardIndex}>
              <ContentCard {...cardInfo} cardType={props.type} />
            </div>
          );
        })}
      </div>
    </>
  );
}