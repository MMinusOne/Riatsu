import { ConfigurationDisplayProps } from "@/types";

export default function ConfigurationDisplay(props: ConfigurationDisplayProps) {
  const { contentEnvironment, onSelectAutoSkipIntro, onSelectAutoSkipOutro } =
    props;
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <button className="btn btn-primary">Previous</button>
        <button className="btn btn-primary">Next</button>
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
          <button className="btn btn-secondary">Download</button>
        </div>
      </div>
    </>
  );
}
