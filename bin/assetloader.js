const wavefile = require('wavefile');

module.exports = {
    PrepareSoundSamples: function(buffer, WavSeperator, WavSeperatorLength){
        //Define Important Variables
        CurrentFile = 0;
        ReturnSamples = [];
        WaveFiles = [``];

        //Identify what the wav seperator is
        WavSeperatorUsage = [];
        for(i=0;i<WavSeperatorLength;i++){
            WavSeperatorUsage.push(WavSeperator);
        }
        BufferComparison = new Buffer.from(WavSeperatorUsage);

        for(i=0;i<buffer.byteLength;i++){
            NextPush = buffer[i].toString(16);
            if(NextPush.length == 2){
                WaveFiles[CurrentFile] += buffer[i].toString(16);
            } else {
                WaveFiles[CurrentFile] += `0`+buffer[i].toString(16);
            }
            if(buffer.slice(i, i+10).includes(BufferComparison)){
                WaveFiles[CurrentFile] = WaveFiles[CurrentFile].slice(0, WaveFiles[CurrentFile].length-20);
                i += 9;
                CurrentFile++;
                WaveFiles.push(``);
            }
        }
        WaveFiles.pop();

        for(i=0;i<WaveFiles.length;i++){
            wav = new wavefile.WaveFile();
            wav.fromBuffer(new Buffer.from(WaveFiles[i], 'hex'));
            ReturnSamples.push(wav.getSamples());
        }

        return ReturnSamples;
    },

    CPBPrepare: function(CPBType, TextLength){
        if(CPBType == `Automatic`)
        {
            return parseInt(Math.ceil(1+(TextLength/30)));
        }
        else
        {
            return parseInt(CPBType, 10);
        }
    }
}