export const mergeDefaultSettings = <T>(
  defaultSettings: T,
  userSettings: Partial<T>
): T => {
  // Start with defaults
  const mergedSettings: any = { ...defaultSettings };

  for (const key in defaultSettings) {
    if (
      typeof defaultSettings[key] === "object" &&
      !Array.isArray(defaultSettings[key])
    ) {
      // If the value is a nested object, recurse
      mergedSettings[key] = mergeDefaultSettings(
        defaultSettings[key],
        userSettings[key] ?? {}
      );
    } else if (key in userSettings) {
      // Use user setting if available
      mergedSettings[key] = userSettings[key];
    }
  }

  return mergedSettings;
};
