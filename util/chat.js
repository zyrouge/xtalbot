module.exports = function(message, author) {
        return new Promise(async function(resolve, reject) {
          var unirest = require("unirest");
          var req = unirest("GET", "https://acobot-brainshop-ai-v1.p.rapidapi.com/get");
          req.query({
            "bid": '10124',
            "key": process.env.BRAIN,
            "uid": author,
            "msg": message
          });
          req.headers({
            "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
            "x-rapidapi-key": "6a02076d37msh72c214a9a91a7bdp180857jsnfdc3c9d94fcb"
          });
          req.end(function (res) {
            if (res.error) throw new Error(res.error);
            resolve(res.body.cnt);
          });
        })
}