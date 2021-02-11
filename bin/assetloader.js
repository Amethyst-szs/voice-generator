var fs = require('fs');
const wavefile = require('wavefile');

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
    },
    GetSamplesFromBuffer: async function(buffer){
        wav = new wavefile.WaveFile();
        await wav.fromBuffer(buffer);
        Samps = await wav.getSamples()
        return Samps;
    }
}