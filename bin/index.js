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
const assetloader = require('./assetloader');
const speechgen = require('./speechgen');

//Important global variable declarations
let StartTime = new Date();

let bBatch;
let BPCType;
let BPCUsage;
let EmotionList;
let StringsList;

let AllSoundFiles = [];
let AllSoundSamples = [];
let CurrentSoundFile = 0;

let CurrentChar = 0;
let PreviousBlips = [-1, -1, -1, -1];
let OutputWavArray = [];

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
    screenformat.ResetScreen();
    //Returns a bool for if this is a single string or batch
    bBatch = await homemenu.SingleOrBatch();
    //Gets the text string or batch file contents
    TextSource = await homemenu.CollectSourceText(bBatch);
    //If using a single string, allows the user to input an emotion
    DefaultEmotion = await homemenu.DefaultEmotion(bBatch);
    //Lets the user pick the BPC
    BPCType = await homemenu.DefineBPC();
    /*
    ////////////
    ANALYSE TEXT
    ////////////
    */
    screenformat.ResetScreen();
    screenformat.DrawAnalysisMessage();

    //Setup variables
    EmotionList = [];
    StringsList = [];

    switch(bBatch){
        case false:
            EmotionList.push(DefaultEmotion);
            StringsList.push(TextSource);
        case true:
            EmotionList = analyser.CreateList(TextSource, true);
            StringsList = analyser.CreateList(TextSource, false);
    }

    AllSoundFiles = assetloader.FindAllSoundFiles(EmotionList[CurrentString]);
    setTimeout(AssetLoading, 100);
}

async function AssetLoading()
{
    FileSelection = `assets/Amethyst/${EmotionList[CurrentString]}/${AllSoundFiles[CurrentSoundFile]}`;
    fs.stat(FileSelection, async function(err, stats) {
        fs.open(FileSelection, 'r', async function(errOpen, fd) {
            fs.read(fd, Buffer.alloc(stats.size), 0, stats.size, 0, async function(errRead, bytesRead, buffer) {
                AllSoundSamples.push(assetloader.GetSamplesFromBuffer(buffer));
                CurrentSoundFile++;
                if(CurrentSoundFile<AllSoundFiles.length){
                    //If there are more waves to load, this condition is called
                    screenformat.ResetScreen();
                    screenformat.DrawVariable(`Emotion`, EmotionList[CurrentString]);
                    screenformat.DrawVariable(`Current Wave File`, FileSelection);
                    screenformat.DrawDivider(20);
                    screenformat.DrawProgressBar(CurrentSoundFile, AllSoundFiles.length, 45, `Loading wavs for current emotion...`)
                    if (bBatch == true) {screenformat.DrawProgressBar(CurrentString, StringsList.length, 60, `Overall Collection Progress`);}
                    setTimeout(AssetLoading, 10);
                } else {
                    //If all waves are loaded, this condition is called
                    screenformat.ResetScreen();
                    BPCUsage = speechgen.BPCPrepare(BPCType, StringsList[CurrentString].length);
                    SpeechWriting();
                }
            });
        });
    });
}

function SpeechWriting()
{
    FileSelection = `${Math.floor(Math.random() * Math.floor(AllSoundFiles.length))}`;
    if(speechgen.PreviousBlipCheck(PreviousBlips, FileSelection) == true){
        setTimeout(SpeechWriting, 20);
        return;
    }

    //Update the list of previous blips to avoid repetition
    PreviousBlips.splice(0, 1);
    PreviousBlips.push(FileSelection);

    //Run through all samples in FileSelection and add to OutputWavArray
    for(Samp=0;Samp<AllSoundSamples[FileSelection].length;Samp++){
        OutputWavArray.push(AllSoundSamples[FileSelection][Samp]);
    }
    //At this point it's complete and the Current Character can be increased
    CurrentChar++;
    
    if(CurrentChar >= StringsList[CurrentString].length/BPCUsage)
    {
        //This condition is triggered if wave generation is complete
        speechgen.OutputWav(OutputWavArray, 10000, StartTime);
        screenformat.DrawComplete();
        CurrentString++;
        if(CurrentString+1 <= StringsList.length){
            //This condition is triggered if a batch has more strings to create
            //Reset variables
            CurrentSoundFile = 0;
            AllSoundSamples = [];
            AllSoundFiles = assetloader.FindAllSoundFiles(EmotionList[CurrentString]);
            CurrentChar = 0;
            OutputWavArray = [];
            AssetLoading();
        }
    }
    else
    {
        //This condition is triggered if wave generation is incomplete
        screenformat.ResetScreen();
        screenformat.DrawVariable(`Current String: `, StringsList[CurrentString]);
        screenformat.DrawVariable(`Recently Selected Blips: `, PreviousBlips);
        screenformat.DrawDivider(20);
        screenformat.DrawProgressBar(CurrentChar, StringsList[CurrentString].length/BPCUsage, 45, `Progress generating output wav:`);
        if (bBatch == true) {screenformat.DrawProgressBar(CurrentString, StringsList.length, 60, `Overall Collection Progress`);}
        SpeechWriting();
    }
}
SetupProcess();