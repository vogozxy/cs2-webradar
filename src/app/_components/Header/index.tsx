import RadarTheme from "./RadarTheme";
import ThemeSwitch from "./ThemeSwitch";
import SettingsButton from "./SettingsButton";

export default function Header() {
  return (
    <header>
      <RadarTheme />
      <ThemeSwitch />
      <SettingsButton />
    </header>
  );
}
