const input = require("input");
var fs = require('fs');

module.exports = {
    SingleOrBatch: async function() {
        UserInput = await input.select(`Are you generating a single voice line or an entire collection?`, [`Single`, `Collection`]);
        switch(UserInput){
            case `Single`:
                return false;
            case `Collection`:
                return true;
        }
    },

    CollectSourceText: async function(bBatch, config) {
        if(bBatch==undefined) { return `Error!`; }
        switch(bBatch){
            case false:
                return await input.text(`What text would you like to use?`);
            case true:
                InputPath = await input.text(`Provide the file path towards your collection file:`);
                AllText = fs.readFileSync(InputPath, `utf-8`);
                AllTextArray = AllText.split(config.CollectionSplit);
                for(i=0;i<AllTextArray.length;i++)
                {
                    if(AllTextArray[i].startsWith(`#`) || AllTextArray[i].length <= 2)
                    {
                        AllTextArray.splice(i, 1);
                        i--;
                    }
                }
                return AllTextArray;
        }
    },

    SingleEmotion: async function(bBatch, SingleCharacter)
    {
        switch(bBatch) {
            case false:
                var AllFolders = fs.readdirSync(`assets/${SingleCharacter}/`);
                if(AllFolders.length < 2){
                    return AllFolders[0].slice(0, AllFolders[0].length-6);
                }

                for(i=0;i<AllFolders.length;i++){
                    AllFolders[i] = AllFolders[i].slice(0, AllFolders[i].length-6);
                }

                return await input.select(`Select the voice line's emotion`, AllFolders);
            case true:
                return `Empty`;
        }
    },

    SingleCharacter: async function(bBatch)
    {
        switch(bBatch) {
            case false:
                AllFolders = fs.readdirSync(`assets/`);
                if(AllFolders.length < 2){
                    return AllFolders[0];
                }
                return await input.select(`Select the voice line's character`, AllFolders);
            case true:
                return `Empty`;
        }
    },

    DefineCPB: async function() {
        return await input.select(`What is your CPB? (Charaters Per Blip)`, [`Automatic`, `1`, `2`, `3`, `4`, `5`]);
    },

    SwaveFolder: async function() {
        return await input.text(`Please supply the folder path to your wave files you would like to convert`);
    },

    SwaveEmotionName: async function() {
        return await input.text(`What should this emotion be called?`);
    },

    SwaveCharacterName: async function() {
        return await input.text(`What character is this emotion for?`);
    }
}