var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
    var links = global.games.map(function(str) {
        return { "href": "/games/" + str };
    });
    
    res.hal({
        "links": {
            "self": "/",
            "games": links,
            "bot-queue": "/queues/bot",
            "human-queue": "/queues/human"
        }
    });
});

router.post('/', function(req, res) {
    var id = uuid.v4();
    global.games.push(id);
    global.game_state[id] = req.body;
    res.send('OK');
});

module.exports = router;
