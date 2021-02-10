const input = require("input");
const chalk = require("chalk");

module.exports = {
    ScreenFormat: async function() {
        console.clear();
        console.log(chalk.hex(`#ff0051`).bold(`Amethyst's Voice Line Tool\n--------------------------`))
    },

    SingleOrBatch: async function() {
        return await input.select(`Are you generating a single voice line or an entire batch?`, [`Single`, `Batch`]);
    },

    CollectSourceText: async function(Mode) {
        if(Mode==undefined) { return `Error!`; }

        if(Mode==`Single`)
        {
            return await input.text(`What text would you like to use?`);
        }
        else if (Mode==`Batch`)
        {
            return await input.text(`Provide the file path towards your batch file: `);
        }
    },

    DefaultEmotion: async function()
    {
        return await input.select(`Select the voice line's emotion?`,
        [`Neutral`,
        `Proud`,
        `Sad`,
        `Nervous`,
        `Angry`,
        `Depressed`,
        `Amused`,
        `Ecstatic`]);
    },

    DefineBPC: async function() {
        return await input.select(`What is your BPC? (Blips per character)`, [`Automatic`, `1`, `2`, `3`, `4`, `5`]);
    }
}