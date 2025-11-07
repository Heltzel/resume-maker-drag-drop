// Importeren van GrapesJS en de CSS
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

// Importeren van plugins
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsBlocksBootstrap4 from "grapesjs-blocks-bootstrap4";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsPluginExport from "grapesjs-plugin-export";

// Templates importeren
import modern from "./templates/modern.js";
import classic from "./templates/classic.js";
import minimalist from "./templates/minimalist.js";
import creative from "./templates/creative.js";
import professional from "./templates/professional.js";

// Editor instellen
const editor = grapesjs.init({
  container: "#gjs",
  height: "100%",
  storageManager: false,
  fromElement: true,
  plugins: [
    grapesjsPresetWebpage,
    grapesjsBlocksBasic,
    grapesjsPluginForms,
    grapesjsBlocksBootstrap4, // ← Bootstrap4 blocks plugin
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

// Voeg een printknop toe aan de navbar
editor.Panels.addButton("options", {
  id: "print-canvas",
  className: "fa fa-print",
  attributes: { title: "Print canvas" },
  command: "print-canvas-command",
});

// Command om canvas te printen
editor.Commands.add("print-canvas-command", {
  run(editor) {
    const html = editor.getHtml();
    const css = editor.getCss();

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Canvas</title>
          <style>
            ${css}
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };
  },
});

// Templates object om makkelijk te wisselen
const cvTemplates = {
  modern,
  classic,
  minimalist,
  creative,
  professional,
};

// Functie om een template te laden
function loadTemplate(name) {
  if (cvTemplates[name]) {
    editor.setComponents(cvTemplates[name]);
  } else {
    console.error("Template bestaat niet:", name);
  }
}

// Event listener voor het selecteren van een template
document.getElementById("templateSelect").addEventListener("change", (e) => {
  loadTemplate(e.target.value);
});

// Stel in op de standaard template (bijv. "modern")
loadTemplate("modern");

console.log("GrapesJS editor gestart:", editor);
