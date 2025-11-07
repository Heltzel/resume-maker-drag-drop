import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

// Plugins
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsBlocksBootstrap4 from "grapesjs-blocks-bootstrap4";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsPluginExport from "grapesjs-plugin-export";

// Editor initialiseren
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

editor.setComponents(`
<!-- plak hier de CV HTML -->
<div class="container" style="padding: 40px; font-family: Arial, sans-serif;">
  <div class="row">
    <!-- Linkerkant: Persoonlijke info -->
    <div class="col-md-4" style="background: #f7f7f7; padding: 20px; border-radius: 8px;">
      <div style="text-align: center;">
        <img src="https://via.placeholder.com/150" alt="Profielfoto" class="img-fluid rounded-circle mb-3">
        <h2>Jane Doe</h2>
        <p>Frontend Developer</p>
      </div>
      <hr>
      <h4>Contact</h4>
      <p>Email: jane.doe@example.com</p>
      <p>Tel: +31 6 12345678</p>
      <p>LinkedIn: linkedin.com/in/janedoe</p>
      <p>Website: www.janedoe.com</p>
    </div>

    <!-- Rechterkant: Ervaring & vaardigheden -->
    <div class="col-md-8" style="padding: 20px;">
      <h3>Over mij</h3>
      <p>Ervaren frontend developer met een passie voor het bouwen van moderne, responsieve webapplicaties met HTML, CSS, JavaScript en React.</p>

      <h3>Werkervaring</h3>
      <div>
        <h5>Frontend Developer @ Bedrijf X</h5>
        <p>2022 - heden</p>
        <ul>
          <li>Ontwikkelen van responsieve webapplicaties</li>
          <li>Implementeren van UI-componenten met React</li>
          <li>Optimalisatie van performance en SEO</li>
        </ul>
      </div>
      <div>
        <h5>Junior Developer @ Bedrijf Y</h5>
        <p>2020 - 2022</p>
        <ul>
          <li>Migratie van legacy code naar moderne frameworks</li>
          <li>Samenwerken in een Agile team</li>
        </ul>
      </div>

      <h3>Vaardigheden</h3>
      <ul>
        <li>HTML / CSS / JavaScript</li>
        <li>React / Redux</li>
        <li>Bootstrap4</li>
        <li>GIT / GitHub</li>
        <li>UI/UX design</li>
      </ul>

      <h3>Opleiding</h3>
      <p>Bachelor Informatica, Universiteit Z, 2016 - 2020</p>
    </div>
  </div>
</div>

`);

console.log("GrapesJS editor gestart:", editor);
