module.exports = {
    CreateList: function(AllText, IsEmotionList) {
        FinalListArray = [];
        switch(IsEmotionList){
            case true:
                for(i=0;i<AllText.length;i++)
                {
                    if(AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                        FinalListArray.push(AllText[i].slice(1, AllText[i].length-1));
                    }
                }
                return FinalListArray;
            case false:
                for(i=0;i<AllText.length;i++)
                {
                    if(!AllText[i].startsWith(`-`) && !AllText[i].startsWith(`~~`)) {
                        FinalListArray.push(AllText[i].slice(0, AllText[i].length-1));
                    }
                }
                return FinalListArray;
        }
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
    }
}