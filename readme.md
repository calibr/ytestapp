1. Install deps: `npm install`

2. Run the webserver: `node ./src/server`

3. Point your browser to `http://localhost:12345/?room=1&role=receiver`

4. Point another browser to `http://localhost:12345/?room=1&role=sender`

In a few seconds you will see that the clients are out of sync, i.e.:

The first browser has content: `["*s*", "*c*"]`
The second browser has content: `["*c*"]`