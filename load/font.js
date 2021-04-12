import * as Font from "expo-font";

let roya = null;
let mj = null;
let yekan = null;
let far;
const load = () => {
  roya = require("../assets/fonts/Roya.ttf");
  mj = require("../assets/fonts/Mj-flow.ttf");
  yekan = require("../assets/fonts/Yekan.ttf");
  far = require("../assets/fonts/Far_Rooznameh.ttf");
  
};

export const fontFamily = {
  roya: "roya",
  mj: "mj",
  yekan: "yekan",
  far:"far",
};

export const fetchFonts = () => {
  load();
  return Font.loadAsync({
    [fontFamily.roya]: roya,
    [fontFamily.mj]: mj,
    [fontFamily.yekan]: yekan,
    [fontFamily.far]: far,
  });
};
