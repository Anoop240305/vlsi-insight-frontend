// Pure theme logic. No React in this file.
const KEY = 'theme'

export const getStoredTheme = () => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

// A saved choice wins; otherwise follow the device or browser.
export const resolveTheme = () => getStoredTheme() ?? getSystemTheme()

export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage can be blocked; the choice then lasts for this visit only */
  }
}
