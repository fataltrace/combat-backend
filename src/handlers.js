import {
    API_TYPE_LOGIN,
    API_TYPE_CANDIDATE,
    API_TYPE_OFFER,
    API_TYPE_ANSWER
} from './constants.js'

const pingPongHandler = (connection) => {
    const PING_INTERVAL = 30 * 1000

    connection.socket.on('connection', () => {
        connection.isAlive = true
        connection.on('pong', () => connection.isAlive = true)
    })

    const pingIntervalHandler = () => {
        connection.socket.clients.forEach((client) => {
            if (!client.isAlive) {
                return client.terminate()
            }

            client.isAlive = false
            client.ping(() => { })
        })
    }

    const pingInterval = setInterval(pingIntervalHandler, PING_INTERVAL)

    connection.socket.on('close', () => clearInterval(pingInterval))
}

const cameraHandler = ({ type, data }) => {
    switch (type) {
        case API_TYPE_LOGIN: return
        case API_TYPE_CANDIDATE: return
        case API_TYPE_OFFER: return
        case API_TYPE_ANSWER: return
    }

    // connection.socket.send('...')
}

export default {
    pingPongHandler,
    cameraHandler
}