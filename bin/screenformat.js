const chalk = require("chalk");

module.exports = {
    ResetScreen: async function() {
        console.clear();
        console.log(chalk.hex(`#ff0051`).bold(`Amethyst's Voice Line Tool\n--------------------------`))
    },
    DrawProgressBar: async function(Current, Target, Size, Message){
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
        BarInside.repeat(Current*(Math.floor(Target/Size)));
        console.log(chalk.hex(`#007db3`).bold(`\n${Message}\n[${BarInside}]`))
    }
}