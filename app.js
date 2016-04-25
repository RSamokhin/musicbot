var TelegramBot = require('node-telegram-bot-api'),
    tokens = require('./config/keys.json'),
    cheerio = require('cheerio'),
    request = require('request'),
    http = require('http');
    fs = require('fs');



tokens.forEach(function (t) {
    var bot = new TelegramBot(t.token, {polling: true});

    bot.on('message', function (msg) {
        //console.log(msg.text);
        //bot.sendMessage(chatId, "Hello!", {caption: "I'm a bot!"});
        sendFile(bot, msg);
    });
});



function sendFile (bot, msg) {
    request('http://m.my.mail.ru/music/search/' + msg.text, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            $('[data-audio-title]').eq(0).each(function (index, el) {
                var $el = $(el),
                    title = $el.attr('data-audio-title'),
                    src = $el.attr('data-audio-src'),
                    duration = $el.find('[data-duration]').attr('data-duration');
                download = function(url, dest, cb) {
                    var file = fs.createWriteStream(dest),
                        request = http.get(url, function(response) {
                            response.pipe(file);
                            file.on('finish', function() {
                                file.close(cb);
                            });
                        }).on('error', function(err) {
                            fs.unlink(dest);
                            if (cb) cb(err.message);
                        });
                };
                var path = './moosic/' + src.split('/')[src.split('/').length - 1].split('.mp3')[0] + '.mp3';
                download(src, path, function () {
                    bot.sendAudio(msg.chat.id, fs.createReadStream(path));
                })
            });
        }
    });
}
