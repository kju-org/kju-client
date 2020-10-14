# KJU JavaScript SDK
 
This is the official JavaScript Client for KJU, that runs on ***Node.js*** and in the ***Browser***

The SDK comes with two APIs:

* A [***Client API***](#client-api), that implements all message oparations
* A [***Processing API***](#processing-api), that is for automated message processing


For details about KJU, visit the [KJU Website](https://kju-org.github.io).

# Install

> npm

```shell
npm i kju-client
```

> Browser

```html
<script src="https://cdn.jsdelivr.net/gh/kju-org/kju-client/index.js"></script>
```

# Example

```javascript
// Initialize
kju = new KJU();

// Create a token
kju.personalToken({
		contact: "email"
	},token => {
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

# Client API

The kju JS client has the folllowing functions:

## personalToken

Creates a personalToken

```javascript
kju.personalToken({
		contact: "email",
	}, token => {
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

## deleteMessage

Delete a single message by id

```javascript
kju.deleteMessage({
	msgId: "The message Id"
	token: "The creationToken that the message was created with"
}, data => {
	console.log(data) // returns a success message
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

# Processing API

> This Part of the API is for ***automated*** message processing. You can use this API to listen to messages and programatically redeem responses.

## listenHttp

Creates an express server and listens for messages on a specified http endpoint. When this endpoint is set as reciever in a message, the message will be transmitted to the listener for further processing.

Message example
```
{
	content: "blablalba",
	reciever: "http://myendpoint.com"
}
```

Example Listener
```javascript
kju.listenHttp({
	route: '/', // path to listen on. "/"" is default
	port: 3000, // port to listen on. 3000 is default
	handler: ((msg, success, err) => {
		// msg is the message
		// success must be called with the responseId that should be auto-redeemed. Like: success("yes");
		// err should be called when something goes wrong on your side
	})
})
```