#!/usr/bin/env node

/*
/////////////
PROGRAM SETUP
/////////////
*/

const fs = require('fs');

//External javascript code
const homemenu = require('./homemenu');
const analyser = require('./analyser');
const screenformat = require('./screenformat');
const speechgen = require('./speechgen');
const assetloader = require('./assetloader');

//Config
const config = require('../config.json');

//Important global variable declaration
let bBatch;
let CPBType;
let CPBUsage;
let EmotionList = [];
let CharacterList = [];
let StringsList = [];
let AllSoundSamples = [];
let CollectionProgress = 0;

let CurrentChar = 0;
let PreviousBlips = [-1, -1, -1, -1];
let OutputWavArray = new Array;

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
    screenformat.ResetScreen();
    //Returns a bool for if this is a single string or batch
    bBatch = await homemenu.SingleOrBatch();
    //Gets the text string or batch file contents
    TextSource = await homemenu.CollectSourceText(bBatch, config);
    //If using a single string, allows the user to input a character
    SingleCharacter = await homemenu.SingleCharacter(bBatch);
    //If using a single string, allows the user to input an emotion
    SingleEmotion = await homemenu.SingleEmotion(bBatch, SingleCharacter);
    //Lets the user pick the CPB
    CPBType = await homemenu.DefineCPB();
    /*
    ////////////
    ANALYSE TEXT
    ////////////
    */
    //Reset Screen
    screenformat.ResetScreen();
    screenformat.DrawAnalysisMessage();

    //Create all lists based on if this is a batch
    switch(bBatch){
        case false:
            EmotionList = [SingleEmotion+`.swave`];
            StringsList = [TextSource];
            CharacterList = [SingleCharacter];
            break;
        case true:
            EmotionList = analyser.CreateEmotionList(TextSource);
            StringsList = analyser.CreateStringsList(TextSource);
            CharacterList = analyser.CreateCharacterList(TextSource);
            break;
    }
    
    //Adds an output folder if it does not exist already to avoid crashes
    if(fs.existsSync(`output`) == false){
        fs.mkdirSync(`output/`);
    }

    //Starts the process by loading in assets
    AssetLoading();
}

function AssetLoading()
{
    //Create a string that points to the current character's emotion
    FileSelection = `assets/${CharacterList[CollectionProgress]}/${EmotionList[CollectionProgress]}`;

    //Read this file and return a buffer
    fs.stat(FileSelection, function(err, stats) {
        fs.open(FileSelection, 'r', function(errOpen, fd) {
            fs.read(fd, Buffer.alloc(stats.size), 0, stats.size, 0, function(errRead, bytesRead, buffer) {
                AllSoundSamples = assetloader.PrepareSoundSamples(buffer, config.SwaveSymbol, config.SwaveSepLength);
                CPBUsage = assetloader.CPBPrepare(CPBType, StringsList[CollectionProgress].length);
                SpeechWriting();
            });
        });
    });
}

function SpeechWriting()
{
    var FileSelection = `${Math.floor(Math.random() * Math.floor(AllSoundSamples.length))}`;
    
    //These are the settings for regex formatting
    var TextSnip = StringsList[CollectionProgress].slice(CurrentChar*CPBUsage, (CurrentChar+1)*CPBUsage);
    
    if(speechgen.PreviousBlipCheck(PreviousBlips, FileSelection) == true && AllSoundSamples.length >= 5){
        setTimeout(SpeechWriting, 20);
        return;
    }

    //Update the list of previous blips to avoid repetition
    PreviousBlips.splice(0, 1);
    PreviousBlips.push(FileSelection);

    //Add the next audio samples to the list
    //Checks if this part of the text has punctuation
    isPunctuation = new RegExp(`[${config.Punctuation}]`).test(TextSnip);

    if(!isPunctuation){
        for(Samp=0;Samp<AllSoundSamples[FileSelection].length;Samp++){ OutputWavArray.push(AllSoundSamples[FileSelection][Samp]); }
    }
    else if(isPunctuation){
        for(Samp=0;Samp<AllSoundSamples[FileSelection].length;Samp++){ OutputWavArray.push(0); }
    }

    //At this point it's complete and the Current Character can be increased
    CurrentChar++;
    
    if(CurrentChar >= StringsList[CollectionProgress].length/CPBUsage)
    {
        //This condition is triggered if wave generation is complete
        speechgen.OutputWav(OutputWavArray, 10000, EmotionList[CollectionProgress], CollectionProgress);
        screenformat.DrawComplete();
        CollectionProgress++;
        if(CollectionProgress+1 <= StringsList.length){
            //This condition is triggered if a batch has more strings to create
            //Reset variables
            CurrentSoundFile = 0;
            AllSoundSamples = [];
            CurrentChar = 0;
            OutputWavArray = [];
            AssetLoading();
        }
    }
    else
    {
        //This condition is triggered if wave generation is incomplete
        screenformat.ResetScreen();
        screenformat.DrawVariable(`Current String: `, StringsList[CollectionProgress]);
        screenformat.DrawVariable(`Recently Selected Blips: `, PreviousBlips);
        screenformat.DrawVariable(`Current CPB: `, CPBUsage);
        screenformat.DrawDivider(20);
        screenformat.DrawProgressBar(CurrentChar, StringsList[CollectionProgress].length/CPBUsage, 45, `Progress generating output wav:`);
        if (bBatch == true) {screenformat.DrawProgressBar(CollectionProgress, StringsList.length, 60, `Overall Collection Progress`);}
        SpeechWriting(CurrentChar);
    }
}

SetupProcess();