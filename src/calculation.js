let limit = parseInt(process.argv[2]) || 100_000_000;
const obj = {};

for (let index = 0; index < limit; index++) {
  let randomNum = Math.ceil(Math.random()*1000);
  obj[randomNum] = obj[randomNum] ? obj[randomNum] + 1 : 1;
};  

process.send(obj);
