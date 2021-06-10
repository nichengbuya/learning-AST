export default function(attrStr:string){
    if(!attrStr){
        return [];
    }
    let isQuote = false;
    let point = 0;
    const result = [];
    attrStr = attrStr.trim();
    for(let i = 0;i<attrStr.length;i++){
        let char = attrStr[i];
        if(char === '"'){
            isQuote = !isQuote;
        }else if(char === ' '&& !isQuote){
            if(!/^s*$/.test(attrStr.substring(point,i))){
                result.push(attrStr.substring(point,i).trim());
                point = i;
            }
        }
    }
    result.push(attrStr.substring(point).trim())
    return result.map(i=>{
        return {
            name:i.match(/^(.+)="(.+)"$/)![1],
            value:i.match(/^(.+)="(.+)"$/)![2]
        }
    });
}