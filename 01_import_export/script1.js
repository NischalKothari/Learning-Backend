var a = 12;
module.exports = a;

//to export a variable or function to other files, you gotta use module.exports

var b = 15; 
var c = "hello";
module.exports = {b, c}; 
//to export multiple variables or functions, you can export them as an object