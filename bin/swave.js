#!/usr/bin/env node

/*
/////////////
PROGRAM SETUP
/////////////
*/

const fs = require('fs');

const homemenu = require('./homemenu');
const screenformat = require('./screenformat');
const analyser = require('./analyser');

const config = require('../config.json');

//User Input
let FolderPath = ``;
let EmotionName = ``;
let CharacterName = ``;

//Buffer Files
let FolderContents = [];
let FullBufferString = ``;
let FullBufferSeperator = ``;

async function SetupProcess(){
    screenformat.ResetScreen();

    FolderPath = await homemenu.SwaveFolder();
    EmotionName = await homemenu.SwaveEmotionName();
    CharacterName = await homemenu.SwaveCharacterName();

    FolderContents = await analyser.FilterDownToFileType(fs.readdirSync(FolderPath), `.wav`);

    for(i=0;i<config.SwaveSepLength;i++){
        FullBufferSeperator += config.SwaveSymbol.slice(2,4);
    }
    AssetLoading(0);
}

function AssetLoading(CurrentFile){
    FileSelection = `${FolderPath}/${FolderContents[CurrentFile]}`;

    fs.stat(FileSelection, async function(err, stats) {
        fs.open(FileSelection, 'r', async function(errOpen, fd) {
            fs.read(fd, Buffer.alloc(stats.size), 0, stats.size, 0, async function(errRead, bytesRead, buffer) {
                FullBufferString += buffer.toString(`hex`);
                FullBufferString += FullBufferSeperator;

                if(CurrentFile+2<=FolderContents.length){
                    setTimeout(AssetLoading, 25, CurrentFile+1);
                } else {
                    if(!fs.existsSync(`assets/${CharacterName}`)){
                        fs.mkdirSync(`assets/${CharacterName}`);
                    }
                    fs.writeFileSync(`assets/${CharacterName}/${EmotionName}.swave`, FullBufferString, {encoding: "hex"});
                }
            });
        });
    });
}

SetupProcess();