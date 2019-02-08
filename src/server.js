const createWebSocketServer = require('./websocket-server')
const express = require('express')
const app = express()

app.use('/dist', express.static(__dirname + '/../dist'))

app.get('/', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    <body>
      <script type="text/javascript" src="/dist/client.js"></script>
    </body>
    </html>
  `
  res.send(html)
})

let server = app.listen(12345)

createWebSocketServer(server)