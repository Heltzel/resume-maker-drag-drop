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

// 🖨️ Voeg printknop toe aan de navbar
editor.Panels.addButton("options", {
  id: "print-canvas",
  className: "fa fa-print",
  attributes: { title: "Print canvas" },
  command: "print-canvas-command",
});

// 📜 Command om de canvas te printen
editor.Commands.add("print-canvas-command", {
  run(editor) {
    const html = editor.getHtml();
    const css = editor.getCss();

    // Maak nieuw venster met canvasinhoud
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

    // Wacht even tot de pagina geladen is voordat we printen
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500); // 0.5 seconde wachten
    };
  },
});

console.log("GrapesJS editor gestart:", editor);
