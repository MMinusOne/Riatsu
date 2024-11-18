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
              checked={contentEnvironment?.videoControls?.autoSkipIntro}
            />
          </label>
        </div>
        <label className="gap-3 cursor-pointer label">
          <span className="label-text">Skip Outro</span>
          <input
            type="checkbox"
            className="toggle"
            checked={contentEnvironment?.videoControls?.autoSkipOutro}
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
