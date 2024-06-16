import RadarTheme from "./RadarTheme";
import ThemeSwitch from "./ThemeSwitch";
import SettingsButton from "./SettingsButton";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-4">
      <RadarTheme />
      <ThemeSwitch />
      <SettingsButton />
    </header>
  );
}
