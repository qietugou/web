#! /usr/bin/env node

//需要mine行解析参数
let commander = require('commander')
let package = require('../package.json')
let parser = {
    prot: 3000,
    host: '127.0.0.1',
    dir: process.cwd()
}
let args = commander
    .version(package.version)
    .option('-p, --port <v>', 'server port')
    .option('-o, --host <v>', 'server hist')
    .option('-o, --dir <v>', 'server dir')
    .parse(process.argv)
let Server = require('../server/index')
let server = new Server({...parser, ...args});
server.start();