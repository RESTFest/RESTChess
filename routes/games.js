var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var base = req.protocol + "://" + req.headers.host
    
    if (global.games.indexOf(id) < 0) {
        res.status(404).send('Game not found');
        return;
    }

    res.send(
        {
            "current-state": "tag:chess.mogsie.com,2001:game-in-progress",
            "data": global.game_state[id],
            "_links": {
                "self": { "href": base + "/games/" + id },
                "workflow:make-decisions": { "href": base + "/games/" + id + "/make-decisions" }
            }
        }
    );
});

router.post('/:id/make-decisions', function(req, res) {
    var id = req.params.id;

    if (global.games.indexOf(id) < 0) {
        res.status(404).send('Game not found');
        return;
    }

    // update game state
    global.game_state[id] = req.body.data;

    // generate work order guid (only handle the first one)
    var decision = req.body.decisions.shift();

    var workid = uuid.v4();
    global.workids[decision.queue] = global.workids[decision.queue] || [];
    global.workids[decision.queue].push(workid);

    global.work[workid] = { "game": id, "work": decision.work, "queue": decision.queue };
    res.send();
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;

    if (global.games.indexOf(id) < 0) {
        res.status(404).send('Game not found');
        return;
    }

    var index = global.games.indexOf(id);
    global.games.splice(index, 1);

    delete global.game_state[id];
    res.send();
});

module.exports = router;
