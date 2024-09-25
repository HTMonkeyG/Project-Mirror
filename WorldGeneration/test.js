const { TheEndDimension } = require("./Dimensions/Dimensions.js")
  , Long = require("../Utils/Long.js");

var a = new TheEndDimension(Long.fromString("5BD942DD", 16));

console.log(a.createGenerator())