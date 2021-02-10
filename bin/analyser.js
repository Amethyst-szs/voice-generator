const chalk = require("chalk");
var fs = require('fs');

module.exports = {
    ConsolePreMessage: async function() {
        console.log(chalk.hex(`#007db3`).bold(`Initial setup is currently in progress.\nPlease wait!`))
    },
    CreateList: async function(AllText, IsEmotionList) {
        FinalListArray = [];
        switch(IsEmotionList){
            case true:
                for(i=0;i<AllText.length;i++)
                {
                    if(AllText[i].startsWith(`-`)) {
                        FinalListArray.push(AllText[i].slice(1, AllText[i].length-1));
                    }
                }
                return FinalListArray
                break;
            case false:
                for(i=0;i<AllText.length;i++)
                {
                    if(!AllText[i].startsWith(`-`)) {
                        FinalListArray.push(AllText[i].slice(0, AllText[i].length-1));
                    }
                }
                return FinalListArray
                break;
        }
    }
}