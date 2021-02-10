var fs = require('fs');
const wavefile = require('wavefile');

module.exports = {
    FindAllSoundFiles: async function(Emotion){
        AllSoundFiles = fs.readdirSync(`D:/Vids/Voices/Amethyst/${Emotion}/`);
        for(i=0;i<AllSoundFiles.length;i++){
            if(!AllSoundFiles[i].includes(".wav")) {
                AllSoundFiles.splice(i, 1);
                i--;
                continue;
            }
        }
        return AllSoundFiles;
    },

    FindSamplesFromFile: async function(File){
        
    }
}