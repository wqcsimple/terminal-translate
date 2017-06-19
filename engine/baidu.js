const http = require('http');
const MD5 = require('../lib/md5');
const chalk = require('chalk');
const Util = require('../lib/util');
const Config = require("../lib/config");

module.exports = (query, config) => {
    const appid = config.baidu.appid;
    const key = config.baidu.key;
    let languageFrom = config.baidu.from;
    let languageTo = config.baidu.to;
    const salt = (new Date).getTime();
    query = query.join('\n');

    let data = {
        q: query,
        from: languageFrom,
        to: languageTo,
        appid,
        salt,
        sign: MD5(appid + query + salt + key)
    };

    let url = `${Config.BAIDU_URL}?${Util.transformObjectToUrlencodedData(data)}`;

    http.get(url, (res) => {

        let resData = "";
        res.on("data", function (data) {
            resData += data;
        });
        res.on("end", function () {
            resData = JSON.parse(resData);
            let template = `\r\n ${chalk.green('~')} query \r\n ${chalk.green('~')} result \r\n`;
            let str = '\r\n';
            if (!("trans_result" in resData)) {
                console.log('查询出错!错误信息如下:');
                console.log(resData)
                return;
            }
            for (let item of resData.trans_result) {
                str += template.replace('query', chalk.cyan(item.src)).replace('result', chalk.cyan(item.dst));
            }
            console.log(str);
        });
    })
        .on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });
}