function readInterFace(jceCode) {
    const interFace = jceCode
        .match(/interface(.*)/)[1]
        .replace("{","")
        .trim()
    const data = jceCode
        .trim()
        .replace(/\/\/.*/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .split("interface")[1]
        .replace("};};", "};")
        .match(/int(.*?)\(/g)
        .map(item => (item
            .replace("int", "")
            .replace("(", "").trim()))
    return {
        interFaceName:interFace,
        interFaceArr:data
        }
}

function compileToAxios(data) {
    const { httpModule, interFaceName, interFaceArr,alias } = data;
    const HEAD = `import httpRequest from '${httpModule}'; `;
    let BODY = ``;
    for (let index = 0; index < interFaceArr.length; index++) {
        const element = interFaceArr[index];
        let httpMethod = ``;
        let args = ``;
        if (element.match(/(get|del|query)/)) {
            httpMethod = 'get'
            args = 'params'
        } else {
            httpMethod = 'post'
            args = 'data'
        }
        BODY += `
            export function ${element}(${args}){
                return httpReqeust({
                    url:'${alias+"/"}${interFaceName}/${element}',
                    method:'${httpMethod}',
                    ${args}
                })
            };
        `
    }
    return `
    ${HEAD}\n
    ${BODY}
    `
}

module.exports = {
    readInterFace,
    compileToAxios
}