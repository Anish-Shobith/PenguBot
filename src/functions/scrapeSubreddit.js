const { Function } = require("@kcp/functions");
const { get } = require("snekfetch");

module.exports = class extends Function {

    run(subreddit) {
        subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
        return get(`https://imgur.com/r/${subreddit}/hot.json`)
            .then(res => {
                if (!res.body.data) return;
                const img = res.body.data[Math.floor(Math.random() * res.body.data.length)];
                if (!img) return null;
                return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
            });
    }

};
