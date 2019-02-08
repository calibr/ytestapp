import * as Y from 'yjs'

import { getParameterByName, wait } from './util'
import { WebsocketProvider } from './provider'

console.log(Y)

const url = 'ws://localhost:12345/ws'
const room = getParameterByName('room')
const role = getParameterByName('role')

const provider = new WebsocketProvider(url)

const y = provider.get(room)

const syncedArr = y.define('arr', Y.Array)


async function go() {
  if(role === 'receiver') {
    syncedArr.push(['*c*'])
    y.connectToWs()
  }
  else if(role === 'sender') {
    syncedArr.push(['*s*'])
    syncedArr.delete(0)
    await wait(3e3)
    y.connectToWs()
  }

  setInterval(() => {
    console.log('Array content is:', syncedArr.toJSON())
  }, 1000)
}

go()