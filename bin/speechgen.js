const wavefile = require('wavefile');
const fs = require('fs');

module.exports = {
    CPBPrepare: function(CPBType, TextLength){
        if(CPBType == `Automatic`)
        {
            return parseInt(Math.ceil(1+(TextLength/30)));
        }
        else
        {
            return parseInt(CPBType, 10);
        }
    },

    PreviousBlipCheck: function(PreviousBlips, FileSelection) {
        for(i=0;i<PreviousBlips.length;i++){
            if(FileSelection == PreviousBlips[i]) {
                return true;
            }
        }
        return false;
    },

    OutputWav: function(OutputWavArray, ExtraSilenceLength, StartTime) {
        for(i=0;i<ExtraSilenceLength;i++){
            OutputWavArray.push(0);
        }
    
        //Creates File Wav File From OutputWavArray And Writes To Disk
        OutputWave = new wavefile.WaveFile;
        OutputWave.fromScratch(1, 44100, '16', OutputWavArray);
        if(fs.existsSync(`output`) == false){
            fs.mkdirSync(`output/`);
        }
        fs.writeFileSync(`output/${StartTime.getTime()}-${new Date().getTime()}.wav`, OutputWave.toBuffer());
        return; 
    }
}