import parseATS from "./ATS"

let templateStr = `
<div>
    <h3 class="aa bb cc" id="text">你好</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li class="myli gg">C</li>
    </ul>
    <div>嘿嘿</div>
    <div id="container">
        <div id="snake">
            <div class="food"></div>
        </div>
    </div>
</div>
`
const ats = parseATS(templateStr);
console.log(ats)
