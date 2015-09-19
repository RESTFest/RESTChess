var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    if (global.workids[id] == undefined) {
        res.send();
    } else {
        if (global.workids[id].length == 0) {
            res.send();
        } else {
            var workid = global.workids[id][0];
            var base = req.protocol + "://" + req.headers.host
            res.send({
                "type": global.work[workid].work.type,
                "input": global.work[workid].work.input,
                "complete": base + "/work/" + workid
            });
        }
    }
});

module.exports = router;
