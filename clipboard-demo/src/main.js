const electron = require('electron')

const path = require('path')
const { app, clipboard, Menu, Tray } = electron

const STACK_SIZE = 5

function checkClipboardForChange(clipboard, onChange){
    let cache = clipboard.readText()
    let latest

    setInterval(_ => {
        latest = clipboard.readText()
        if (latest !== cache){
            cache = latest
            onChange(cache)
        }
    },1000)
}

function addToStack(item, stack){
    console.log(stack.length)
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length -1) : stack)
}

app.on('ready',_ => {

    var tray = new Tray(path.join('src','Flat-Enigma.ico'))

    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: "<empty>",
            enabled: false
        }
    ]))

    let stack = []
    
    checkClipboardForChange(clipboard, text => {

        stack = addToStack(text, stack)

        console.log('stack', stack)
    })
})