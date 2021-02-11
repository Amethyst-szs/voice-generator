const wavefile = require('wavefile');
const fs = require('fs');

module.exports = {
    BPCPrepare: function(BPCType, TextLength){
        if(BPCType == `Automatic`)
        {
            return parseInt(Math.ceil(1+(TextLength/30)));
        }
        else
        {
            return parseInt(BPCType, 10);
        }
    },

    OutputWav: function(OutputWavArray, ExtraSilenceLength, StartTime) {
        for(i=0;i<ExtraSilenceLength;i++){
            OutputWavArray.push(0);
        }
    
        //Creates File Wav File From OutputWavArray And Writes To Disk
        OutputWave = new wavefile.WaveFile;
        OutputWave.fromScratch(1, 44100, '16', OutputWavArray);
        fs.writeFileSync(`output/${StartTime.getTime()}-${new Date().getTime()}.wav`, OutputWave.toBuffer());
        return; 
    }
}