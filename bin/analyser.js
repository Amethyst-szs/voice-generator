module.exports = {
    CreateEmotionList: function(AllText) {
        FinalListArray = [];
        for(i=0;i<AllText.length;i++){
            if(AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                FinalListArray.push(AllText[i].slice(1, AllText[i].length-1));
            }
        }
        return FinalListArray;
    },

    CreateStringsList: function(AllText) {
        FinalListArray = [];
        for(i=0;i<AllText.length;i++){
            if(!AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                FinalListArray.push(AllText[i].slice(0, AllText[i].length-1));
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

    TextFiltering: function(AllTextArray){
        //Apply text filters and search for regex
        var RepetitionRegex = new RegExp(`<*>`)

        for(i=0;i<AllTextArray.length;i++){
            var RepetitionMatch = RepetitionRegex.exec(AllTextArray[i]);
            if(RepetitionMatch != null){
                
                console.log(AllTextArray[i][RepetitionMatch.index-1]);
            }
            console.log(RepetitionMatch.index);
            console.log(`Breakpoint`);
        }

        return AllTextArray;
    }
}