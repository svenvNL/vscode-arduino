const vscode = require('vscode');

const vsconfig = vscode.workspace.getConfiguration('arduino');
const file = vscode.window.activeTextEditor.document.fileName.split('\\');
let currentDir = '';
file.pop();
file.forEach((path) => {
  currentDir += `${path}/`;
});

module.exports = {
  comport: (vsconfig.get('buildPath') !== undefined) ? vsconfig.get('buildPath') : 'COM3',
  arduinoBuilder: 'C:\\Program Files (x86)\\Arduino\\arduino-builder.exe',
  tools: [
    'C:\\Program Files (x86)\\Arduino\\hardware\\tools',
    'C:\\Program Files (x86)\\Arduino\\tools-builder',
  ],
  buildPath: `${currentDir}tmp`,
  fqbn: 'arduino:avr:uno',
};
