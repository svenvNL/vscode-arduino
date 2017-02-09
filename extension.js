const vscode = require('vscode');
const arduino = require('./lib/arduino');
const settings = require('./lib/settings');

exports.activate = context => {
  const setCOMPort = vscode.commands.registerCommand('arduino.setCOMPort', () => {
    vscode.window.showInputBox().then((outcome) => {
      if (outcome !== undefined) {
        settings.comport = outcome;
      }
    });
  });

  const compile = vscode.commands.registerCommand('arduino.compile', () => {
    if (!vscode.window.activeTextEditor.document) {
      vscode.window.showErrorMessage('Not able to compile without an open document.');
    } else if (vscode.window.activeTextEditor.document.isDirty) {
      vscode.window.showErrorMessage('Make sure to save before compiling.');
    } else {
      arduino.compile(vscode.window.activeTextEditor.document.fileName);
    }
  });

  const upload = vscode.commands.registerCommand('arduino.upload', () => {
    if (!vscode.window.activeTextEditor.document) {
      vscode.window.showErrorMessage('Not able to upload without an open document.');
    } else if (vscode.window.activeTextEditor.document.isDirty) {
      vscode.window.showErrorMessage('Make sure to save before uploading.');
    } else {
      arduino.compile(vscode.window.activeTextEditor.document.fileName, () => {
        arduino.upload(vscode.window.activeTextEditor.document.fileName);
      });
    }
  });

  context.subscriptions.push([setCOMPort, compile, upload]);
};

exports.deactivate = function () {
};
