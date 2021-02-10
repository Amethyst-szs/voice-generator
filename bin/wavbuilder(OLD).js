const chalk = require("chalk");
const wavefile = require('wavefile');
var fs = require('fs');

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

    GetSamplesFromWav: async function(File){
        await fs.stat(File, function(err, stats) {
            FileSize = stats.size;
            fs.open(File, 'r', function(errOpen, fd) {
                fs.read(fd, Buffer.alloc(FileSize), 0, FileSize, 0, function(errRead, bytesRead, buffer) {
                    // console.log(buffer)
                    wav = new wavefile.WaveFile();
                    wav.fromBuffer(buffer);
                    Samps = wav.getSamples()
                    console.log(Samps);
                    return Samps;
                });
            });
        });
    }
}