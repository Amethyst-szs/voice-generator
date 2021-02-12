# voice-generator
Generates wave files for speaking text using audio blips

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
This part is slightly confusing. CPB (Characters Per Blip) is used to avoid text strings being too long. If you choose automatic it will make a resonable CPB for the text provided, but you can define it manually on a scale of 1-5.

## Output from the program
So what will this program actually make? After running it will output a wave file for every text string given to it. (These can be found in the `output/` folder) These wave files will be made using the emotion selected. The files will be named in this format: **Time of Completion-Emotion-Text**.

Each output wave file is made up of blips from the `assets/` folder. More detail about assets can be found further down.

## Generating Collections
Generating a collection is very useful because you could make any amount of wave files in one batch. Collections are made from .txt files. They are quite simple to make. Starting a line with a ***#*** is a comment and will be completely ignored. Starting a line with a ***-*** is how you define an emotion. You need one of these before every spoken line. Starting a line with ***\~\~*** will allow you to switch characters. It is worth noting that you don't need to set this before every line, just set it every time you want to switch to a new character speaking. Starting a line with no symbol means it is a spoken line.

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

## The Assets Folder
This folder is where audio files go that the program will use to generate your output. The structure of the folder is listed below.

- assets
  - Characters
    - Emotions
      - Wave Files

The character folders lets you pick who is talking in this example. The emotions section is where all your "variants" of that character live. The wave files inside there must all follow the format of `Emotion Name (same as the folder)1.wav`, `Emotion Name (same as the folder)2.wav`, ect. Amethyst is included when downloading the repo and that folder structure is shown below.

- assets
  - Amethyst
    - Amused
      - Amused1.wav
      - Amused2.wav
      - Amused3.wav
      - Ect...
    - Angry
      - Angry1.wav
      - Angry2.wav
      - Angry3.wav
      - Ect...
    - Ect...

This is fully expandable! If you make your own blip sounds, add them to the assets folder and assuming you format it correctly, the program will recognize them and work with your wave files!
