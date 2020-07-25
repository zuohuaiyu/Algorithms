/* 
    数字转成千分位加逗号的格式
*/

function toThousands(number) {
    let num = (number || 0).toString().split('.');
    let negetive = false;
    let result = '';
    if(num[0][0] === '-') {
        num[0] = num[0].slice(1, num[0].length);
        negetive = true;
    }
    while (num[0].length > 3) {
        result = ',' + num[0].slice(-3) + result;
        num[0] = num[0].slice(0, num[0].length - 3);
    }
    if(num[0]) result = num[0] + result;
    if(num[1]) result = result + '.' + num[1];
    if (negetive) result = "-" + result;
    return result;
}

function toThousands_Reg(num) {
  var str = num.toString();
  var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg, "$1,");
}

function toThousands_toLocale(number) {
    return number.toLocaleString();
}


console.log(toThousands(-121234.123));
console.log(toThousands_toLocale(-121234.123));
console.log(toThousands_Reg(-121234.123));