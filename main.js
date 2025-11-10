import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

// Importeren van de benodigde plugins
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsBlocksBootstrap4 from "grapesjs-blocks-bootstrap4"; // Bootstrap 4 blokken plugin
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsPluginExport from "grapesjs-plugin-export";

// Importeren van Bootstrap 4 CSS via npm
import "bootstrap/dist/css/bootstrap.min.css";

// Templates importeren
import modern from "./templates/modern.js";
import modern2 from "./templates/modern2.js";
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
    grapesjsBlocksBootstrap4, // Voeg Bootstrap 4 blokken toe
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

//  print button
editor.Panels.addButton("options", {
  id: "print-canvas",
  className: "fa fa-print",
  attributes: { title: "Print canvas" },
  command: "print-canvas-command",
});
// download  buttonu
editor.Panels.addButton("options", {
  id: "download-canvas",
  className: "fa fa-download",
  attributes: { title: "Download canvas" },
  command: "download-canvas-command",
});

// download  buttonu
editor.Panels.addButton("options", {
  id: "upload-canvas",
  className: "fa fa-upload",
  attributes: { title: "Upload canvas" },
  command: "upload-canvas-command",
});

// command  om canvas  te uploaden
editor.Commands.add("upload-canvas-command", {
  run: function (editor) {
    // Maak een file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json"; // We beperken de bestandsselectie tot JSON-bestanden

    // Wanneer een bestand is geselecteerd, wordt het verwerkt
    input.onchange = function (event) {
      const file = event.target.files[0];
      if (file && file.type === "application/json") {
        // Lees het geselecteerde bestand
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            // Parse het JSON-bestand
            const jsonData = JSON.parse(e.target.result);
            // Laad de componenten en stijlen in het canvas
            editor.setComponents(jsonData.components);
            editor.setStyle(jsonData.styles);
          } catch (error) {
            alert("Fout bij het laden van het JSON-bestand: " + error.message);
          }
        };
        reader.readAsText(file);
      } else {
        alert("Selecteer een geldig JSON-bestand.");
      }
    };

    // Trigger de bestandselectie
    input.click();
  },
});

// command om canvas te downloaden
editor.Commands.add("download-canvas-command", {
  run: function (editor) {
    // Verkrijg de canvas data in JSON formaat
    const canvasData = editor.getComponents(); // Dit haalt de componenten op
    const styleData = editor.getCss(); // Dit haalt de CSS op

    // Maak een JSON-object van de componenten en CSS
    const jsonData = {
      components: canvasData,
      styles: styleData,
    };

    // Maak een Blob van de JSON data voor download
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    // Maak een download-link en trigger deze
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas.json"; // Bestandsnaam voor het JSON-bestand
    link.click();
  },
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
  modern2,
  classic,
  minimalist,
  creative,
  professional,
};

// Functie om een template te laden
function loadTemplate(name) {
  if (cvTemplates[name]) {
    // Dynamisch Bootstrap 4 toevoegen aan de editor
    const bootstrapLink = `<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" />`;

    // Voeg de <link> toe aan de HTML die in de editor wordt geladen
    const htmlWithBootstrap = bootstrapLink + cvTemplates[name];

    // Laad de template in de editor
    editor.setComponents(htmlWithBootstrap);
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
