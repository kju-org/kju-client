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

    this.KJU_URL = "http://europe-west3-spoocloud-202009.cloudfunctions.net/kju-dummy/api";

    this.KJU_CREATION_TOKEN = null;
    //this.KJU_LAST_CONSUMER_TOKEN = null;

    this.createToken = (data, cb) => {

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

        fetch(this.KJU_URL + '/messages?token=' + data.token, {
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