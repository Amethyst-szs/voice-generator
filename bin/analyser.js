module.exports = {
    CreateEmotionList: function(AllText) {
        FinalListArray = [];
        for(i=0;i<AllText.length;i++){
            if(AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                FinalListArray.push(AllText[i].slice(1, AllText[i].length-1)+`.swave`);
            }
        }
        return FinalListArray;
    },

    CreateStringsList: function(AllText) {
        FinalListArray = [];
        //Isolate down to spoken strings
        for(i=0;i<AllText.length;i++){
            if(!AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                FinalListArray.push(AllText[i].slice(0, AllText[i].length-1));
            }
        }
        //Cut off these lines if it encounters a mid-line comment
        for(i=0;i<FinalListArray.length;i++){
            if(FinalListArray[i].includes(`#`)){
                FinalListArray[i] = FinalListArray[i].slice(0, FinalListArray[i].indexOf(`#`));
            }
        }
        return FinalListArray;
    },

    CreateCharacterList: function(AllText) {
        var FinalListArray = [];
        var CurrentCharacter = `Invalid`;
        for(i=0;i<AllText.length;i++)
        {
            if(AllText[i].startsWith(`~~`)) {
                CurrentCharacter = AllText[i].slice(2, AllText[i].length-1)
            }
            else if(!AllText[i].startsWith(`-`)){
                FinalListArray.push(CurrentCharacter);
            }
        }
        return FinalListArray;
    },

    FilterDownToFileType: function(AllFiles, FileType = `.wav`){
        for(i=0;i<AllFiles.length;i++){
            if(!AllFiles[i].includes(FileType)) {
                AllFiles.splice(i, 1);
                i--;
                continue;
            }
        }
        return AllFiles;
    }
}