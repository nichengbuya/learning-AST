import parseAttrStr from './parseAttrStr';
interface Data{
    tag:string;
    children:Data[],
    text?:string;
    attr?:{
        name:string;
        value:string;
    }[]
}
export default function parseATS(str:string){
    let index = 0;
    const tagStack = [];
    const dataStack:Data[] = [{tag:'body',children:[]}];
    let rest = '';
    const startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    const endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    const wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/;
    while(index < str.length-1){
        rest = str.substring(index);
        if(startRegExp.test(rest)){
            const tag = rest.match(startRegExp)![1];
            const attrStr = rest.match(startRegExp)![2];
            tagStack.push(tag);
            dataStack.push({tag:tag,children:[],attr:parseAttrStr(attrStr)});
            index += tag.length + (attrStr?attrStr.length:0) +  2;
            // console.log(`${tag}:in`)
        }else if(endRegExp.test(rest)){
            const tag = rest.match(endRegExp)![1];
            if(tag === tagStack[tagStack.length-1]){
                const tag = tagStack.pop();
                const data = dataStack.pop();     
                dataStack[dataStack.length-1].children.push(data!); 
            }else{
                throw new Error('tag not close')
            }
            index += tag.length + 3;
            // console.log(`${tag}:out`)
        }else if(wordRegExp.test(rest)  ){
            const word = rest.match(wordRegExp)![1];
            if(!/^\s+$/.test(word)){
                dataStack[dataStack.length-1].text = word;
            }
            index += word.length;
        }else{
            index++;
        }
    } 
    return dataStack[0].children[0];
}