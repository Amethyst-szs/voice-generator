const wavefile = require('wavefile');
const fs = require('fs');

module.exports = {
    PreviousBlipCheck: function(PreviousBlips, FileSelection) {
        for(i=0;i<PreviousBlips.length;i++){
            if(FileSelection == PreviousBlips[i]) {
                return true;
            }
        }
        return false;
    },

    OutputWav: function(OutputWavArray, ExtraSilenceLength, Emotion, CollectionProgress) {
        for(i=0;i<ExtraSilenceLength;i++){
            OutputWavArray.push(0);
        }
        //Creates File Wav File From OutputWavArray And Writes To Disk
        OutputWave = new wavefile.WaveFile;
        OutputWave.fromScratch(1, 44100, '16', OutputWavArray);
        fs.writeFileSync(`output/${CollectionProgress+1}-${new Date().getTime()}-${Emotion}.wav`, OutputWave.toBuffer());
        return; 
    }
}