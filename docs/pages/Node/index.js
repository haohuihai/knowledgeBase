// 1.2 通过字符串来创建一个 Buffer 对象
// Buffer.from(string[, encoding])
var buf = Buffer.from('你好世界Hello');
console.log(buf);
console.log(buf.length);
var len = Buffer.byteLength('你好世界Hello', 'utf8');
console.log(len);

console.log('isBuffer',  Buffer.isBuffer(buf));
