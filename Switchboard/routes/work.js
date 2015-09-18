var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/:id', function(req, res, next) {
    var workid = req.params.id;
    // update game
    var game = global.work[workid].game;
    console.log(req);
    var event = {
        "type": "work-completed",
        "name": "make-a-move",
        "data": req.body
    };

    global.game_state[game]['recent-events'] = global.game_state[game]['recent-events'] || [];
    global.game_state[game]['recent-events'].push(event)

    // clear work from queue
    var index = global.workids['bots'].indexOf(workid);
    if (index > -1) {
        global.workids['bots'].splice(index, 1);
    }
    //delete global.workids['bots'].workid;
    // clear work
    delete global.work[workid];
    res.send();
});

module.exports = router;
