var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };
}

if (_nodejs)
    fetch = require('node-fetch');


const KJU = function() {

    this.logsEnabled = true;

    this.KJU_URL = "https://europe-west3-spoocloud-202009.cloudfunctions.net/kju-dummy/api";

    this.KJU_CREATION_TOKEN = null;
    //this.KJU_LAST_CONSUMER_TOKEN = null;

    this.listenHttp = (data) => {

        if(!_nodejs) throw new Error('Feature lot available in this environment')

        const app = require('express')();
        const bodyParser = require('body-parser');
      
        const port = data.port || 3000

        app.post((data.route || '/'), bodyParser.json(), (req, res) => {

            console.log('body', req.body)

            if (!data.handler) {
                return res.status(400).json({ err: 'no handler provided' });
            }           

            data.handler(req.body, (responseId) => {
                res.json({ msg: 'ok', returnUrl: this.KJU_URL + '/message/' + req.body._id + '/response/' + responseId + '?token=' + req.body.consumerToken })
            }, err => {
                res.status(400).json({ err: err })
            });

        })

        app.listen(port, () => {
            console.log(`KJU listener on port ${port}`)
        })

    }


    this.personalToken = (data, cb) => {

        fetch(this.KJU_URL + '/personalToken', {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                this.personalToken = json.data;
                if (cb) cb(this.personalToken);
                if (this.logsEnabled) console.log('token saved:', json);
            });
    }

    this.createMessage = (data, cb) => {

        fetch(this.KJU_URL + '/message?token=' + data.token || KJU_CREATION_TOKEN, {
                method: 'post',
                body: JSON.stringify(data.msg),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('message created', json)
            });

    }

    this.getMessage = (data, cb) => {

        fetch(this.KJU_URL + '/message/' + data.msgId + '?token=' + data.token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('message:', json)
            });
    }

    this.deleteMessage = (data, cb) => {

        fetch(this.KJU_URL + '/message/' + data.msgId + '?token=' + data.token, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('message:', json)
            });
    }

    this.getMessages = (data, cb) => {

        fetch(this.KJU_URL + '/messages/' + data.type + '?token=' + data.token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('messages:', json)
            });
    }

    this.redeemResponse = (data, cb) => {

        fetch(this.KJU_URL + '/message/' + data.msgId + '/response/' + data.respId + '?token=' + data.token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('redeemed:', json)
            });
    }

    this.redeemResponseByLink = (link, cb) => {

        fetch(link, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                if (cb) cb(json);
                if (this.logsEnabled) console.log('redeemed:', json)
            });
    }
}

if (_nodejs)
    module.exports = KJU;
else window.KJU = KJU;