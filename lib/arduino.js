const vscode = require('vscode');
const spawn = require('child_process').spawn;
const fs = require('fs');
const settings = require('./settings');

const output = vscode.window.createOutputChannel('Arduino');

exports.compile = (file, callback) => {
  if (!fs.existsSync(settings.buildPath)) {
    fs.mkdirSync(settings.buildPath);
  }

  output.show(true);

  const compile = spawn(settings.arduinoBuilder, [
    '-hardware', 'C:\\Program Files (x86)\\Arduino\\hardware',
    '-tools', 'C:\\Program Files (x86)\\Arduino\\hardware\\tools',
    '-tools', 'C:\\Program Files (x86)\\Arduino\\tools-builder',
    '-fqbn', settings.fqbn,
    '-build-path', settings.buildPath,
    '-compile', file,
  ]);

  compile.stdout.on('data', (data) => {
    output.append(String.fromCharCode.apply(String, data));
  });

  compile.stderr.on('data', (data) => {
    output.append(String.fromCharCode.apply(String, data));
  });

  compile.on('close', () => {
    if (callback) {
      callback();
    }
  });
};

exports.upload = file => {
  const filepathArray = file.split('\\');
  const sketchFile = filepathArray[filepathArray.length - 1];

  const upload = spawn('C:\\Program Files (x86)\\Arduino\\hardware\\tools\\avr/bin/avrdude', [
    '-C', 'C:\\Program Files (x86)\\Arduino\\hardware\\tools\\avr/etc/avrdude.conf',
    '-V',
    '-patmega328p',
    '-carduino',
    `-P${settings.comport}`,
    '-b115200',
    '-D',
    `-Uflash:w:${settings.buildPath}\\${sketchFile}.hex:i`,
  ]);

  upload.stdout.on('data', (data) => {
    output.append(String.fromCharCode.apply(String, data));
  });

  upload.stderr.on('data', (data) => {
    output.append(String.fromCharCode.apply(String, data));
  });
};
