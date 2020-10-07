# KJU JavaScript SDK
 
This is the official JavaScript Client for KJU. 

Runs on ***Node.js*** and in the ***Browser***

# Install

> npm

```shell
npm i kju-sdk
```

> Browser

```html
<script>
```

# Example

```javascript
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

