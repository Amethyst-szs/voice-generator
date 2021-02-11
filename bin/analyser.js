module.exports = {
    CreateList: function(AllText, IsEmotionList) {
        FinalListArray = [];
        switch(IsEmotionList){
            case true:
                for(i=0;i<AllText.length;i++)
                {
                    if(AllText[i].startsWith(`-`)) {
                        FinalListArray.push(AllText[i].slice(1, AllText[i].length-1));
                    }
                }
                return FinalListArray;
            case false:
                for(i=0;i<AllText.length;i++)
                {
                    if(!AllText[i].startsWith(`-`)) {
                        FinalListArray.push(AllText[i].slice(0, AllText[i].length-1));
                    }
                }
                return FinalListArray;
        }
    }
}