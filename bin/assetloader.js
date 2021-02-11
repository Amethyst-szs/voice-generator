var fs = require('fs');

module.exports = {
    FindAllSoundFiles: function(Emotion){
        AllSoundFiles = fs.readdirSync(`assets/Amethyst/${Emotion}/`);
        for(i=0;i<AllSoundFiles.length;i++){
            if(!AllSoundFiles[i].includes(".wav")) {
                AllSoundFiles.splice(i, 1);
                i--;
                continue;
            }
        }
        return AllSoundFiles;
    }
}