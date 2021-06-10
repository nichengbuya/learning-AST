import parseATS from "./ATS"

let templateStr = `
<div>
    <h3>你好</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
    </ul>
    <div>嘿嘿</div>
</div>
`
const ats = parseATS(templateStr);
console.log(ats)
