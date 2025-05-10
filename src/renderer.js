const {ipcRenderer: ipc} = require("electron-better-ipc")

const loginWin = {
    win: null,
    get getWin() {
        return this.win
    },
    set setWin(win) {
        this.win = win
    }
}

async function login() {
    await ipc.callMain("startLogin");
}

ipc.answerMain("authURL", (url) => {
    const win = window.open(url)
    loginWin.setWin = win
})

ipc.answerMain("closeAuthWin", () => {
    loginWin.getWin.close()
})