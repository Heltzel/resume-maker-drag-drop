import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsBlocksBootstrap4 from "grapesjs-blocks-bootstrap4";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsPluginExport from "grapesjs-plugin-export";

const editor = grapesjs.init({
  container: "#gjs",
  height: "100%",
  storageManager: false,
  fromElement: true,
  plugins: [
    grapesjsPresetWebpage,
    grapesjsBlocksBasic,
    grapesjsPluginForms,
    grapesjsBlocksBootstrap4,
    grapesjsStyleBg,
    grapesjsNavbar,
    grapesjsComponentCountdown,
    grapesjsPluginExport,
  ],
  pluginsOpts: {
    [grapesjsBlocksBasic]: { flexGrid: true },
    [grapesjsPresetWebpage]: { blocksBasicOpts: { flexGrid: true } },
  },
});

console.log("GrapesJS editor gestart:", editor);
