const achievement = {
    currentAchievements: 0,
    totalAchievements: 0,
    currentGamerscore: 0,
    totalGamerscore: 0,
    progressPercentage: 0,
}

const game = {
    name: "",
    type: "",
    devices: [],
    coverImage: "",
    achievementProgress: achievement
}

function createAchievement(currentAchievements, totalAchievements, currentGamerscore, totalGamerscore, progressPercentage) {
    let newAchievement = Object.create(achievement)
    newAchievement.currentAchievements = currentAchievements
    newAchievement.totalAchievements = totalAchievements
    newAchievement.currentGamerscore = currentGamerscore
    newAchievement.totalGamerscore = totalGamerscore
    newAchievement.progressPercentage = progressPercentage

    return newAchievement
}

function createGame(name, type, devices, coverImage, achievement) {
    let newGame = Object.create(game)
    newGame.name = name
    newGame.type = type
    newGame.devices = devices
    newGame.coverImage = coverImage
    newGame.achievementProgress = achievement

    return newGame
}

exports.achievement = achievement
exports.game = game

exports.createAchievement = createAchievement
exports.createGame = createGame