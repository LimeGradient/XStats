const index = require("../index.js")
const gameType = require("../types/game.js")

const accGames = []

function getTitleHistory() {
    return new Promise((resolve, reject) => {
        const client = index.xboxClient.getClient
        client.isAuthenticated().then(() => {
            client.getProvider("titlehub").getTitleHistory().then((result) => {
                for(let game in result.titles){
                    let achievement = gameType.createAchievement(
                        result.titles[game].achievement.currentAchievements,
                        result.titles[game].achievement.totalAchievements,
                        result.titles[game].achievement.currentGamerscore,
                        result.titles[game].achievement.totalGamerscore,
                        result.titles[game].achievement.progressPercentage
                    )

                    let newGame = gameType.createGame(
                        result.titles[game].name,
                        result.titles[game].type,
                        result.titles[game].devices,
                        result.titles[game].displayImage,
                        achievement
                    )

                    accGames.push(newGame)
                }
                resolve(accGames)
            }).catch((err) => {
                reject("rejected: " + err)
            })
        }).catch((err) => {
            reject("User is not authenticated")
        })
    })
}

exports.accGames = accGames

exports.getTitleHistory = getTitleHistory