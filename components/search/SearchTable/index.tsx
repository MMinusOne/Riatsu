import { IAnimeResult } from "@consumet/extensions";
import { ContentCard } from "../../misc/ContentCard/ContentCard";

export default function SearchTable(props: {
  type: "anime" | "movie" | "manga";
  data: IAnimeResult[];
}) {
  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-3 p-4 w-full h-fit">
        {props?.data?.map((cardInfo, cardIndex) => {
          return (
            <>
              <ContentCard {...cardInfo} cardType={props.type} key={cardIndex} />
            </>
          );
        })}
      </div>
    </>
  );
}
