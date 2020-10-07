# KJU JavaScript SDK
 
This is the official JavaScript Client for KJU. 

Runs on ***Node.js*** and in the ***Browser***

For details about KJU, visit the [KJU Website](https://kju-org.github.io).


# Install

> npm

```shell
npm i kju-client
```

> Browser

```html
<script src="https://cdn.jsdelivr.net/gh/kju-org/kju-client@latest/index.js"></script>
```

# Example

```javascript
// Initialize
kju = new KJU();

// Create a token
kju.createToken(token => {
	console.log(token) // sdn23nf29q...
})

// Create a message
kju.createMessage({
	msg: {
		content: "Will you agree?",
		reciever: "optional@whatever.com",
		responses: ["Yes", "No"]
	},
	token: "ksdnt2n30...."
}, data => {
	console.log(data) // { messagee ... }
})

kju.redeemResonse({
	msgId: "2u192rj923rr",
	respId: "Yes",
	token: "293rhj238nj2fm"
}, data => {
	console.log(data) // { msg: "ok" }
})
```

# API

The kju JS client has the folllowing functions:

## createToken

Creates a creationToken

```javascript
kju.createToken(token => {
	console.log(token) // sdn23nf29q...
})
```

## createMessage

Creates a message

```javascript
kju.createMessage({
	msg: {
		content: "Some text",
		reciever: "optional reciever(s)",
		responses: ["One", "Two"] // An array of predefined responses
	},
	token: "The creationToken"
}, data => {
	console.log(data) // returns the message
})
```

## getMessage

Returns a single message by id

```javascript
kju.getMessage({
	msgId: "The message Id"
	token: "The consumer token"
}, data => {
	console.log(data) // returns the message
})
```

## getMessages

Returns multiple messages that have the message Tag embedded in the consumer token

```javascript
kju.getMessages({
	token: "The consumer token"
}, data => {
	console.log(data) // returns the messages
})
```

## redeemResponse

Redeems a response

```javascript
kju.redeemResponse({
	msgId: "The message Id",
	respId: "The identifier of the response",
	token: "The consumer token"
}, data => {
	console.log(data) // returns a success message
})
```

## redeemResponseByLink

Redeems a response using the complete link

```javascript
kju.redeemResponseByLink("https://whater...", data => {
	console.log(data) // returns a success message
})
```