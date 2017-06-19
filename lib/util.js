/**
 * @author whis admin@wwhis.com
 * @Created 6/19/17
 */

function transformObjectToUrlencodedData(obj) {
    let p = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return p.join('&');
}

let Util = {
    transformObjectToUrlencodedData: transformObjectToUrlencodedData
};

module.exports = Util;