var pg = require('pg');
var dbUrl = process.env.DATABASE_URL || "pg://localhost/makemea";

module.exports = {
    end: function() {
        pg.end();
    },
    all: function(table, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    allOrdered: function(table, orderBy, ascdesc, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' ORDER BY ' + orderBy + ' ' + ascdesc, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    find: function(table, column, value, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            console.log(err);
            console.log('SELECT * FROM ' + table + ' WHERE ' + column + '= \'' + value + '\'');
            client.query('SELECT * FROM ' + table + ' WHERE ' + column + '= \'' + value + '\'', function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    findOrdered: function(table, column, value, orderBy, ascdesc, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            console.log(err);
            console.log('SELECT * FROM ' + table + ' WHERE ' + column + '= \'' + value + '\'' + 'ORDER BY ' + orderBy + " " + ascdesc);
            client.query('SELECT * FROM ' + table + ' WHERE ' + column + '= \'' + value + '\'' + 'ORDER BY ' + orderBy + " " + ascdesc, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    findRelations: function(table, column, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    findRelationsOrdered: function(table, column, id, orderBy, ascdesc, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id + 'ORDER BY ' + orderBy + " " + ascdesc, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    delete: function(table, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('DELETE FROM ' + table + ' WHERE id=' + id, function(err, result) {
                done();
                cb(result);
            });
        });
        this.end();
    },
    create: function(table, obj, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var columns = [];
            var values = [];
            var dollars = [];
            Object.keys(obj).forEach(function(key, i) {
                columns.push(key);
                values.push(obj[columns[i]]);
                dollars.push('$' + (i + 1));
            });
            var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES(' + dollars.join(', ') + ') RETURNING id AS id';
            client.query(query, values, function(err, result) {
                console.log(err);
                console.log('INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES(' + dollars.join(', ') + ')');
                done();
                cb(result.rows[0]);
            });
        });
        this.end();
    },
    update: function(table, obj, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var columns = [];
            var set = [];
            var values = [];
            Object.keys(obj).forEach(function(key, i) {
                columns.push(key);
                set.push(key + '=($' + (i + 1) + ')');
                values.push(obj[columns[i]]);
            });
            client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id, values, function(err, result) {
                done();
                cb(result);
            });
        });
        this.end();
    },
    updateOne: function(table, column, value, id, cb) {
        // console.log('UPDATE ' + table + ' SET ' + column + ' = ' + value + ' WHERE id=' + id);
        pg.connect(dbUrl, function(err, client, done) {
            client.query('UPDATE ' + table + ' SET ' + column + ' = ' + value + ' WHERE id=' + id, function(err, result) {
                done();
                cb(result);
            });
        });
        this.end();
    },
};
