var x = require('./script1.js');
console.log(x);

//to import a variable or function from other files, you gotta use require('path of the file')

var obj = require('./script1.js');
console.log(obj.b);
console.log(obj.c);

//to import multiple variables from other files, you can export them as an object and then import that object