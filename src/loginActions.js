const loginActions = {
    setUsername: (store, newUsername) => {
        store.setState({...store.state, username: newUsername})
    },
    setPassword: (store, newPassword) => {
        store.setState({...store.state, password: newPassword})
    }
}

export default loginActions
