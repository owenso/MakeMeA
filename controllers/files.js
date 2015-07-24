var File = require('../models/file.js').File;
var db = require('../db.js');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require("fs");

module.exports.controller = function(app) {
    app.post('/reply/:id', function(req, res) {
        var pather = req.body.blobpath.replace('blob:http%3A//localhost%3A3000/', "");
        var masterpather = path.join(__dirname, '../public/uploads/', pather, '/');
        mkdirp(masterpather, function(err) {
            if (err) {
                console.log("mkdirp failed - " + err);
            }

            fs.writeFile(path.join(__dirname, '../public/uploads/', pather, '/video.webm'), req.body.blob, 'base64', function(error) {
                if (error) {
                    console.error("write error:  " + error.message);
                } else {
                    console.log("Successful Write to " + path);
                }
            });
        });

        if (req.session.users_id) {
            req.body.users_id = req.session.users_id;
        }
        if (req.body.blob) {
            console.log('webm');
            req.body.url = '/uploads/' + pather + '/video.webm';
        } else {
            console.log('file upload');
            req.body.url = req.files.url.file.replace("public", "");
            req.body.filetype = req.files.url.mimetype;
        }
        req.body.requests_id = req.params.id;


        var newbodyobject = {
            description: req.body.description,
            url: req.body.url,
            filetype: req.body.filetype,
            requests_id: req.body.requests_id
        };


        File.newReply(newbodyobject, req.params.id, function(newpost) {});
        res.redirect('/request/' + req.params.id);
    });

    app.post('/replygif/:id', function(req, res) {
        var pather = req.body.blobpath.replace('blob:http%3A//localhost%3A3000/', "");
        var masterpather = path.join(__dirname, '../public/uploads/', pather, '/');
        mkdirp(masterpather, function(err) {
            if (err) {
                console.log("mkdirp failed - " + err);
            }

            fs.writeFile(path.join(__dirname, '../public/uploads/', pather, '/video.gif'), req.body.blob, 'base64', function(error) {
                if (error) {
                    console.error("write error:  " + error.message);
                } else {
                    console.log("Successful Write to " + path);
                }
            });
        });

        if (req.session.users_id) {
            req.body.users_id = req.session.users_id;
        }
        if (req.body.blob) {
            console.log('gif');
            req.body.url = '/uploads/' + pather + '/video.gif';
        } else {
            console.log('file upload');
            req.body.url = req.files.url.file.replace("public", "");
            req.body.filetype = req.files.url.mimetype;
        }
        req.body.requests_id = req.params.id;


        var newbodyobject = {
            description: req.body.description,
            url: req.body.url,
            filetype: req.body.filetype,
            requests_id: req.body.requests_id
        };


        File.newReply(newbodyobject, req.params.id, function(newpost) {});
        res.redirect('/request/' + req.params.id);
    });

    app.post('/replyaud/:id', function(req, res) {
        var pather = req.body.blobpath.replace('blob:http%3A//localhost%3A3000/', "");
        var masterpather = path.join(__dirname, '../public/uploads/', pather, '/');
        mkdirp(masterpather, function(err) {
            if (err) {
                console.log("mkdirp failed - " + err);
            }

        });
        fs.writeFile(path.join(__dirname, '../public/uploads/', pather, '/video.wav'), req.body.blob, 'base64', function(error) {
            if (error) {
                console.error("write error:  " + error.message);
            } else {
                console.log(req.body.blob);
                console.log("Successful Write to " + path);
            }
        });

        if (req.session.users_id) {
            req.body.users_id = req.session.users_id;
        }
        if (req.body.blob) {
            console.log('wav');
            req.body.url = '/uploads/' + pather + '/video.wav';
        } else {
            console.log('file upload');
            req.body.url = req.files.url.file.replace("public", "");
            req.body.filetype = req.files.url.mimetype;
        }
        req.body.requests_id = req.params.id;


        var newbodyobject = {
            description: req.body.description,
            url: req.body.url,
            filetype: req.body.filetype,
            requests_id: req.body.requests_id
        };


        File.newReply(newbodyobject, req.params.id, function(newpost) {});
        res.redirect('/request/' + req.params.id);
    });

    app.get('/upvote/:make/:id', function(req, res) {
        File.upVote(req.params.id, function(upvoted) {
            console.log('upvoted');
            res.redirect('/request/' + req.params.make);
        });
    });
    app.get('/downvote/:make/:id', function(req, res) {
        File.downVote(req.params.id, function(downvoted) {
            console.log('downvoted');
            res.redirect('/request/' + req.params.make);
        });
    });
    app.delete('/deleteFile/:make/:id', function(req, res) {
        File.deleteFile(req.params.id, function(callback) {});
        res.redirect('/request/' + req.params.make);
    });
};
