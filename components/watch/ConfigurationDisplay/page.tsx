import { ConfigurationDisplayProps } from "@/types";

export default function ConfigurationDisplay(props: ConfigurationDisplayProps) {
  const { contentEnvironment, onSelectAutoSkipIntro, onSelectAutoSkipOutro, onClickPrevious, onClickNext } =
    props;
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <button onClick={onClickPrevious} className="btn btn-primary">Previous</button>
        <button onClick={onClickNext} className="btn btn-primary">Next</button>
        <div className="form-control">
          <label className="gap-3 cursor-pointer label">
            <span className="label-text">Skip Intro</span>
            <input
              type="checkbox"
              className="toggle"
              defaultChecked={contentEnvironment?.videoControls?.autoSkipIntro}
              onChange={(e) => {
                onSelectAutoSkipIntro(e.target.checked);
              }}
            />
          </label>
        </div>
        <label className="gap-3 cursor-pointer label">
          <span className="label-text">Skip Outro</span>
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={contentEnvironment?.videoControls?.autoSkipOutro}
            onChange={(e) => {
              onSelectAutoSkipOutro(e.target.checked);
            }}
          />
        </label>
        <div className="flex-1"></div>
        <div>
          {" "}
          <button className="md:flex hidden btn btn-disabled btn-secondary disabled">Download</button>
        </div>
      </div>
    </>
  );
}
