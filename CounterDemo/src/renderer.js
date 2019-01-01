const electron = require('electron');

const ipc = electron.IpcRenderer;

document.getElementById('start').addEventListener('click', _=> {
    ipc.send('countdown-start');
});