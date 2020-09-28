var _nodejs = (
    typeof process !== 'undefined' && process.versions && process.versions.node);
if (_nodejs) {
    _nodejs = {
        version: process.versions.node
    };
}

if (_nodejs) {
    const fetch = require('node-fetch');
}

const kju = function() {

    this.KJU_URL = "";

    this.KJU_CREATION_TOKEN = null;
    //this.KJU_CONSUMER_TOKEN = null;

    this.createToken = () => {

        fetch(this.KJU_URL + '/creationToken' {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                this.creationToken = json.data;
                console.log('token saved:', json);
            });
    }

    this.createMessage = (msg, creationToken) => {

        fetch(this.KJU_URL + '/message?token=' + creationToken || KJU_CREATION_TOKEN, {
                method: 'post',
                body: msg,
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log('message created', json)
            });

    }

    this.getMessage = (msgId, token) => {

        fetch(this.KJU_URL + '/message/' + msgId + '?token=' + token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log('message:', json)
            });
    }

    this.getMessages = (token) => {

        fetch(this.KJU_URL + '/messages?token=' + token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log('messages:', json)
            });
    }

    this.redeemResponse = (msgId, respId, token) => {

        fetch(this.KJU_URL + '/message/' + msgId + '/response/' + respId + '?token=' + token, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log('redeemed:', json)
            });
    }

    this.redeemResponseLink = (link) => {

        fetch(link, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => {
                console.log('redeemed:', json)
            });
    }
}

if (_nodejs) {
    module.exports.kju = kju;
} else window.kju = kju;
