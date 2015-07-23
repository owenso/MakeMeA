var db = require('../db.js');

module.exports.File = {
    newReply: function(body, callback) {
        db.create('files', body, function(newfile) {});
    },
    getFiles: function(id, callback) {
        db.findOrdered('files', 'requests_id', id, 'votes', 'DESC', function(filesbyreq) {
            callback(filesbyreq);
        });
    },
    upVote: function(id, callback) {
        db.updateOne('files', 'votes', ('votes + 1'), id, function(upvoted) {
            callback(upvoted);
        });
    },
    downVote: function(id, callback) {
        db.updateOne('files', 'votes', ('votes - 1'), id, function(downvoted) {
            callback(downvoted);
        });
    },
    deleteFile: function(id, callback) {
        db.delete('files', id, function(deleted) {
            callback(deleted);
        });
    },
};
