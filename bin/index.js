#!/usr/bin/env node

/*
/////////////
PROGRAM SETUP
/////////////
*/

const sound = require('sound-play');
const wavefile = require('wavefile');
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
let TextSource;
let DefaultEmotion;
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
        screenformat.ResetScreen();
        analyser.ConsolePreMessage();
    
        EmotionList = analyser.CreateList(TextSource, true);
        StringsList = analyser.CreateList(TextSource, false);
    }
    else
    {
        EmotionList.push(DefaultEmotion);
        StringsList.push(TextSource);
    }
    AllSoundFiles = assetloader.FindAllSoundFiles(EmotionList[CurrentString]);
    setTimeout(AssetLoading, 100);
}

function SpeechWriting()
{
    FileSelection = `${Math.floor(Math.random() * Math.floor(AllSoundFiles.length))}`;
    //Check for repeat sound
    for(i=0;i<PreviousBlips.length;i++)
    {
        if(FileSelection == PreviousBlips[i]) {
            setTimeout(SpeechWriting, 10);
            return;
        }
    }

    //Update the list of previous blips to avoid repetition
    PreviousBlips.splice(0, 1);
    PreviousBlips.push(FileSelection);

    //Run through all samples in FileSelection and add to OutputWavArray
    for(Samp=0;Samp<AllSoundSamples[FileSelection].length;Samp++){
        OutputWavArray.push(AllSoundSamples[FileSelection][Samp]);
    }

    CurrentChar++;
    
    if(CurrentChar >= StringsList[CurrentString].length/BPCUsage)
    { 
        sound.play('assets/Amethyst/Neutral/Neutral1.wav', 1);
        speechgen.OutputWav(OutputWavArray, 10000, StartTime);
        if(CurrentString+1 >= StringsList.length){
            screenformat.DrawComplete();
            return;
        }
        else
        {
            CurrentString++;
            CurrentChar = 0;
            OutputWavArray = [];
            if(EmotionList[CurrentString-1] == EmotionList[CurrentString])
            {
                SpeechWriting();
            }
            else
            {
                CurrentSoundFile = 0;
                AllSoundSamples = [];
                AllSoundFiles = assetloader.FindAllSoundFiles(EmotionList[CurrentString]);
                AssetLoading();
            }
        }
    }
    else
    {
        screenformat.ResetScreen();
        screenformat.DrawVariable(`Current String: `, StringsList[CurrentString]);
        screenformat.DrawVariable(`Recently Selected Blips: `, PreviousBlips);
        screenformat.DrawDivider(20);
        screenformat.DrawProgressBar(CurrentChar, StringsList[CurrentString].length/BPCUsage, 45, `Progress generating output wav:`);
        if (bBatch == true) {screenformat.DrawProgressBar(CurrentString, StringsList.length, 60, `Overall Collection Progress`);}
        SpeechWriting();
    }
}

async function AssetLoading()
{
    FileSelection = `assets/Amethyst/${EmotionList[CurrentString]}/${AllSoundFiles[CurrentSoundFile]}`;
    
    //Open File
    fs.stat(FileSelection, async function(err, stats) {
        FileSize = stats.size;
        fs.open(FileSelection, 'r', async function(errOpen, fd) {
            fs.read(fd, Buffer.alloc(FileSize), 0, FileSize, 0, async function(errRead, bytesRead, buffer) {
                //Gather Samples From File
                wav = new wavefile.WaveFile();
                await wav.fromBuffer(buffer);
                Samps = await wav.getSamples()
                AllSoundSamples.push(Samps);
                CurrentSoundFile++;
                if(CurrentSoundFile<AllSoundFiles.length)
                {
                    screenformat.ResetScreen();
                    screenformat.DrawVariable(`Emotion`, EmotionList[CurrentString]);
                    screenformat.DrawVariable(`Current Wave File`, FileSelection);
                    screenformat.DrawDivider(20);
                    screenformat.DrawProgressBar(CurrentSoundFile, AllSoundFiles.length, 45, `Loading wavs for current emotion...`)
                    if (bBatch == true) {screenformat.DrawProgressBar(CurrentString, StringsList.length, 60, `Overall Collection Progress`);}
                    setTimeout(AssetLoading, 10);
                }
                else
                {
                    screenformat.ResetScreen();
                    BPCUsage = speechgen.BPCPrepare(BPCType, StringsList[CurrentString].length);
                    SpeechWriting();
                }
            });
        });
    });
}

SetupProcess();