// const { readFileSync } = require("fs");
const {readInterFace,compileToAxios} = require("./utils/compile")
// const fileStr = readFileSync('../test/TgProduct.jce', 'utf-8')



module.exports = function (jceCode) {
    const opt = this.getOptions();
    const data = readInterFace(jceCode);
    data.httpModule = opt.http;
    const exportRet = compileToAxios(data)
    console.log(exportRet);
    return exportRet;
}

// const data = readInterFace(fileStr)
// data.httpModule = "@/utils/axios"
// const exportRet = compileToAxios(data)
// console.log(exportRet);