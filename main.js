"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var parser = require('csv-parse/lib/sync');
var validation_1 = require("./validation");
var objects = parser(fs.readFileSync('Users.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true
});
var headers = [];
for (var key in objects[0]) {
    headers.push(key);
}
var validObjects = [];
var invalidData = [];
for (var i = 0; i < objects.length; i++) {
    var holder = validation_1.validate(objects[i]);
    // @ts-ignore
    if (holder.isValid) {
        validObjects.push(objects[i]);
    }
    else {
        // @ts-ignore
        invalidData.push(holder.validationInfo);
    }
}
console.log(validObjects);
console.log(invalidData);
var database = require('mysql');
var connection = database.createConnection({
    database: 'myTest',
    host: 'localhost',
    user: 'root',
    password: ''
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    var _loop_1 = function (i) {
        var properties = headers.map(function (header) { return validObjects[i][header]; });
        sql = 'INSERT INTO Users(' + headers.join(',') + ') ' +
            'VALUES(' + properties.map(function (properties) { return '?'; }) + ')';
        try {
            connection.query(sql, properties, function (err, result) {
                if (err)
                    throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        }
        catch (err) {
            console.log(err.name);
        }
    };
    var sql;
    for (var i = 0; i < validObjects.length; i++) {
        _loop_1(i);
    }
    connection.end();
});
