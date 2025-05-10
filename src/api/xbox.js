const index = require("../index.js")

function getTitleHistory() {
    const client = index.xboxClient.getClient
    client.isAuthenticated().then(() => {
        client.getProvider("titlehub").getTitleHistory().then((result) => {
            var i = 0
            for(let game in result.titles){
                console.log('- '+result.titles[game].mediaItemType+': '+result.titles[game].name+' '+result.titles[game].displayImage)
                console.log(`achievement percent: ${result.titles[game].achievement.progressPercentage}`)
            }
        }).catch((err) => {
            console.log("rejected: ", err)
        })
    }).catch((err) => {
        console.log("User is not authenticated: ", err)
    })
}

exports.getTitleHistory = getTitleHistory