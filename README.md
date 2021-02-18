# voice-generator
Generates wave files for speaking text using audio blips

## Requirements
##### Node
##### npm

## How to use
Download the master branch of the repo and extract the contents. Open the `run.bat` or run `node .` in the command line. (Note: Running the run.bat script will also install npm dependencies automatically)
The command line will give you options which will be detailed below:

### Single or collection
The first question asked by the command line will ask you if you want a single or collection generation. Single will allow you to type in any text and use that, while collection lets you generate an entire collection of text. (more detail about how to format a batch can be found further down) What questions are asked next changes based on this resposnse.

### Text Or File Source
Next you will be asked for the text or file you want to use. If you chose a single audio generation, type in the text string now. If you chose a collection generation, supply the file path to the collection file

### Character Selection
**NOTE: This only occurs if you are doing a single generation.** This will load all folders from `assets/` and lets you choose a character.

### Emotion Selection
**NOTE: This only occurs if you are doing a single generation.** This will load all folders from `assets/{CharacterChoice}/` and lets you choose an emotion.

### Setting the CPB
CPB (Characters Per Blip) is used to avoid text strings being too long. If you choose automatic it will make a resonable CPB for the text provided, but you can define it manually on a scale of 1-5.

## Output from the program
So what will this program actually make? After running it will output a wave file for every text string given to it. (These can be found in the `output/` folder) These wave files will be made using the emotion selected. The files will be named in this format: **Time of Completion-Emotion-Text**.

Each output wave file is made up of blips from the `assets/` folder. More detail about assets can be found further down.

## Generating Collections
Generating a collection is very useful because you could make any amount of wave files in one batch. Collections are made from .txt files. They are quite simple to make. Starting a line with a ***#*** is a comment and will be completely ignored. Starting a line with a ***-*** is how you define an emotion. You need one of these before every spoken line `Note for advanced users: Don't include ".swave" after your emotion name.` Starting a line with ***\~\~*** will allow you to switch characters. It is worth noting that you don't need to set this before every line, just set it every time you want to switch to a new character speaking. Starting a line with no symbol means it is a spoken line.

```
#Example:

#Video script 2-11-2021
#Make sure to start on a sunny day!

~~Amethyst

-Proud
I'm so happy it's finally done!
-Proud
It took so much work

#Explosion sound effect

-Nervous
What was that?!

#Running sounds

-Angry
Oh it's just you!
-Angry
Explosion jim!!

~~ExplosionJim
-Panic
Oh no you found me! How?!?!?!
```

## Config .json
This file contains some things you can modify about the program easily. Every option will be detailed below
```
"Punctuation": ".?!"
This parameter can be used to change which symbols are marked as punctuation

"SwaveSymbol": "0xFD"
This parameter marks what hexadecimal value is used to seperate waves in a swave. Not recommened to change!

"SwaveSepLength": "10"
Amount of the SwaveSymbol it needs to find in a row to seperate wave files in a swave. Not recommened to change!
```

## The Assets Folder
This folder is where audio files go that the program will use to generate your output. The structure of the folder is listed below.

- assets
  - Characters
    - Emotion .swave Files

The character folders lets you pick who is talking. The emotion section is where all your "variants" of that character live. Amethyst is included when downloading the repo and that folder structure is shown below. Each emotion is contained in a .swave file, a custom file type used for this program. These files are used to allow loading dozens of wave files without needing to go to disk over and over and over to get all the needed files. One .swave file contains every source .wav file. An example of the folder structure is shown below.

- assets
  - Amethyst
    - Asumed.swave
    - Angry.swave
    - Depressed.swave
    - Ecstatic.swave
    - Nervous.swave
    - Ect...
    
## Added new sounds and characters (ADVANCED)

Wanna create a new character to add to this list? Great! This guide should teach you how to do it.

#### Making your source .wav files

How do you make the blip sounds? I used a program called Bfxr to generate the sounds. I don't have a ton of advice to give here, just download the program and play around with it. Try to keep each sound blip short and you need to make at least 5 variants of that emotion. This can be done very easily in Bfxr with the mutation feature it has.

#### Combining your .wav files into a .swave

In order to use your new blip sounds in the program, you need to convert them into a .swave file. In order to do this, open the command line and move your directory into the root of the program (same place as the `run.bat` file). Then run the command `npm start swave` or `node bin/swave.js`. This will give you three options. The first option wants you to drag and drop the folder containing all of your source .wav files. (NOTE: Don't drag and drop all the .wav files, drag and drop the folder). After that you will input what the emotion should be called (Case sensitive). Lastly, input what character this emotion is for!

Once you are done with all that, the new emotion will be there the next time you open the program!
