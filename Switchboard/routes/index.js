var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.hal({
        links: {
            self: "/",
            games: [
                { href: "/chess-game/23j89nuklyedsio/" }
            ],
            "bot-queue": "/queues/bot",
            "human-queue": "/queues/human"
        }
    });
});

module.exports = router;
