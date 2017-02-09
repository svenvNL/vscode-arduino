const vscode = require('vscode');

let file = vscode.window.activeTextEditor.document.fileName.split('\\');
let currentDir = '';
file.pop();
file.forEach(path => {
  currentDir += `${path}/`;
});

module.exports.comport = 'COM3';
module.exports.arduinoBuilder = 'C:\\Program Files (x86)\\Arduino\\arduino-builder.exe';
module.exports.tools = [
  'C:\\Program Files (x86)\\Arduino\\hardware\\tools',
  'C:\\Program Files (x86)\\Arduino\\tools-builder',
];
module.exports.buildPath = `${currentDir}tmp`;
module.exports.fqbn = 'arduino:avr:uno';
