#!/usr/bin/env node

/*
/////////////
PROGRAM SETUP
/////////////
*/
//External javascript code
const homemenu = require('./homemenu');

/*
////////////
MAIN PROCESS
////////////
*/
async function MainProcess()
{
    //Display the homemenu and ask the use questions
    await homemenu.ScreenFormat();
    let SingleOrBatch = await homemenu.SingleOrBatch();
    let TextSource = await homemenu.CollectSourceText(SingleOrBatch);
    let DefaultEmotion = ``;
    if (SingleOrBatch == `Single`) { DefaultEmotion = await homemenu.DefaultEmotion() }
    let BPC = await homemenu.DefineBPC();

    //Prepare data for usage
    await homemenu.ScreenFormat();
}

MainProcess();