var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    if (global.games.indexOf(id) < 0) {
        res.status(404).send('Game not found');
        return;
    }

    res.hal({
        "data": {
            "current-state": "tag:chess.mogsie.com,2001:game-in-progress",
            "data": global.game_state[id]
        },
        "links": {
            "self": "/games/" + id,
            "workflow:make-decisions": "/games/" + id + "/make-decisions"
        }
    });
});

module.exports = router;
