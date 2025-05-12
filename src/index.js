const { app, BrowserWindow } = require('electron')
const { ipcMain: ipc } = require("electron-better-ipc")

const path = require('node:path')
const XboxApiClient = require("xbox-webapi")

const xboxAPI = require("./api/xbox.js")

const window = {
    win: BrowserWindow,
    
    get getWin() {
        return this.win
    },

    set setWin(win) {
        this.win = win
    },
}

const xboxClient = {
    client: XboxApiClient,
    accGames: Array,
    
    get getClient() {
        return this.client
    },

    set setClient(client) {
        this.client = client
    },
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('index.html')

    window.setWin = win
}

app.whenReady().then(() => {
    const client = new XboxApiClient({
        clientId: "e752a660-2435-483c-b8ad-c203eff9e839"
    })

    xboxClient.setClient = client

    ipc.answerRenderer("startLogin", async url => {
        client.isAuthenticated().then(function(){
            // User is authenticated
            console.log('User is authenticated.')
            xboxAPI.getTitleHistory().then((games) => {
                games.forEach((game) => {
                    console.log("game: " + JSON.stringify(game))
                })
            })
        
        }).catch(function(error){
            // User is not authenticated
            console.log('User is not authenticated. Starting flow...')
            var url = client.startAuthServer(function(){
                console.log('Authentication is done. User logged in')
                ipc.callRenderer(window.getWin, "closeAuthWin")
        
                client.isAuthenticated().then(function(){
                    xboxAPI.getTitleHistory()
                    xboxClient.accGames.forEach((game) => {
                        console.log(JSON.stringify(game))
                    })
                }).catch(function(error){
                    console.log('error', error)
                })
            })
            ipc.callRenderer(window.getWin, "authURL", url)
        })
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

exports.window = window
exports.xboxClient = xboxClient