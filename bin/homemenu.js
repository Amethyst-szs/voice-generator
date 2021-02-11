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

    CollectSourceText: async function(bBatch) {
        if(bBatch==undefined) { return `Error!`; }
        switch(bBatch){
            case false:
                return await input.text(`What text would you like to use?`);
            case true:
                InputPath = await input.text(`Provide the file path towards your collection file:`);
                AllText = fs.readFileSync(InputPath, `utf-8`);
                AllTextArray = AllText.split(`\n`);
                for(i=0;i<AllTextArray.length;i++)
                {
                    if(AllTextArray[i].startsWith(`#`) || AllTextArray[i].length <= 2)
                    { 
                        AllTextArray.splice(i, 1);
                        i--
                    }
                }
                return AllTextArray;
        }
    },

    SingleEmotion: async function(bBatch)
    {
        switch(bBatch) {
            case false:
                AllFolders = fs.readdirSync(`assets/Amethyst/`);
                return await input.select(`Select the voice line's emotion?`, AllFolders);
            case true:
                return `Empty`;
        }
    },

    DefineBPC: async function() {
        return await input.select(`What is your BPC? (Blips per character)`, [`Automatic`, `1`, `2`, `3`, `4`, `5`]);
    }
}