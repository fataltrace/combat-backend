let store = {
    users: {
        viewers: [],
        cameras: []
    }
}

const addUserViewer = (user) => {
    store.users.viewers.push(user)
}

const addUserCamera = (user) => {
    store.users.cameras.push(user)
}

const store = () => {
    return store
}

export default store

export const addUserViewer
export const addUserCamera