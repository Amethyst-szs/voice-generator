#!/usr/bin/env node

/*
/////////////
PROGRAM SETUP
/////////////
*/
//External javascript code
const homemenu = require('./homemenu');
const analyser = require('./analyser');
const screenformat = require('./screenformat');
const assetloader = require('./assetloader');

//Important global variable declarations
let bBatch;
let TextSource;
let DefaultEmotion;
let BPC;
let EmotionList;
let StringsList;
let CurrentString = 0;

/*
////////////
MAIN PROCESS
////////////
*/
async function SetupProcess()
{
    /*
    //////////////////////////////
    GET IMPORTANT VALUES FROM USER
    //////////////////////////////
    */
    //Display the homemenu and ask the use questions
    await screenformat.ResetScreen();
    //Returns a bool for if this is a single string or batch
    bBatch = await homemenu.SingleOrBatch();
    //Gets the text string or batch file contents
    TextSource = await homemenu.CollectSourceText(bBatch);
    //If using a single string, allows the user to input an emotion
    DefaultEmotion = await homemenu.DefaultEmotion(bBatch);
    //Lets the user pick the BPC
    BPC = await homemenu.DefineBPC();

    /*
    //////////////////////////////////////
    ANALYSE TEXT FILE (BATCH VERSION ONLY)
    //////////////////////////////////////
    */
    //Setup variables
    EmotionList = [];
    StringsList = [];
    //Create the lists
    if(bBatch == true)
    {
        await screenformat.ResetScreen();
        await analyser.ConsolePreMessage();
    
        EmotionList = await analyser.CreateList(TextSource, true);
        StringsList = await analyser.CreateList(TextSource, false);
    }
    else
    {
        EmotionList.push(DefaultEmotion);
        StringsList.push(TextSource);
    }

    setTimeout(MainProcess, 200);
}

async function MainProcess()
{
    /*
    ///////////
    LOAD ASSETS
    ///////////
    */
    AllSoundFiles = await assetloader.FindAllSoundFiles(EmotionList[CurrentString]);
    AssetLoaderID = setInterval(assetloader.FindAllSoundFiles, 50);
}

SetupProcess();