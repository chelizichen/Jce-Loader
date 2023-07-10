#!/usr/bin/env node

const {  readFileSync, writeFile, writeFileSync } = require("fs");
const path = require("path")
const { cwd } = require("process")
const program = require("commander")

program.version("1.0.0")
    .command("at <JceFilePath>")
    .option("-a,--alias <char>", "request  alias")
    .description("compile jce to axios http request")
    .action(function (arg,opt) {
        if (!arg) {
            throw new Error("the path of *.jce must be declared")
        }
        const filePath = path.resolve(cwd(), arg);
        console.log(filePath);
        const jce2JsPath = filePath.replace(".jce","Request.js")
        const str = readFileSync(filePath,"utf-8")
        const { readInterFace, compileToAxios } = require("../src/utils/compile");
        const interFace = readInterFace(str)
        interFace.httpModule = '@/utils/request'
        interFace.alias = opt.alias || ""
        const fileContent =  compileToAxios(interFace);
        writeFileSync(jce2JsPath, fileContent)
    })

program.parse(process.argv);

