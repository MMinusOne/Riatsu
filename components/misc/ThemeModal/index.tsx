import { ThemeState } from "@/components/state/themeStore";
import themes from "@/constants/themes";

export default function ThemeModal(props: { themeStore: ThemeState }) {
  const { themeStore } = props;
  const handleThemeChange = (theme: string) => {
    themeStore.setTheme(theme);
  };
  return (
    <>
      <dialog id="theme_modal" className="modal">
        <div className="modal-box">
          <h2 className="font-semibold text-lg">Select Theme</h2>
          <div className="flex flex-col gap-2 mt-4">
            {themes.map((theme) => (
              <button
                key={theme}
                className="btn"
                onClick={() => handleThemeChange(theme)}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            type="button"
            className="btn"
            onClick={() => {
              const modal = document.getElementById(
                "theme_modal"
              ) as HTMLDialogElement;
              if (!modal) return;
              modal.close();
            }}
          >
            Close
          </button>{" "}
        </form>
      </dialog>
    </>
  );
}
