import Typography from "typography"
import deYoung from "typography-theme-de-young"
// const typography = new Typography(deYoung)

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Meera Inimai",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Lato", "Georgia", "serif"],
})
export const { scale, rhythm, options } = typography
export default typography
