const chalk = require("chalk");

module.exports = {
    ResetScreen: function() {
        console.clear();
        console.log(chalk.hex(`#ff0051`).bold(`\n\nAmethyst's Voice Line Tool\n--------------------------`))
    },
    DrawProgressBar: function(Current, Target, Size, Message){
        CurrentSymbol = 0;
        BarInside = ``;
        while (CurrentSymbol<Size)
        {
            if((CurrentSymbol/Size) <= (((Current/Target)*Size)/Size))
            {
                BarInside += `#`;
            }
            else
            {
                BarInside += `-`;
            }
            CurrentSymbol++
        }
        console.log(chalk.hex(`#00ade3`).bgHex(`#3f0011`).bold(`\n${Message}\n[${BarInside}] ${Math.round((Current/Target)*100)}%`))
    },
    DrawVariable: function(Title, Value){
        console.log(chalk.hex(`#00ade3`).bgHex(`#3f0011`).bold(`\n${Title}: ${Value}`));
        return;
    },
    DrawDivider: function(Size){
        Divider = ``;
        for(i=0;i<Size;i++){
            Divider += `-`;
        }
        console.log(chalk.hex(`#ff0051`).bold(`\n${Divider}`));
    },
    DrawComplete: function(){
        console.log(chalk.hex(`#00ddff`).bgHex(`#3f0011`).bold(`\n\nExporting is complete!\nYou can find your files in the output folder`));
    },
    DrawAnalysisMessage: function() {
        console.log(chalk.hex(`#007db3`).bold(`Initial setup is currently in progress.\nPlease wait!`))
    },
    DrawEqualizer: function(WaveData, Size) {
        console.log(chalk.hex(`#00ddff`).bgHex(`#3f0011`).bold(`\n${WaveData.length}`))
    }
}