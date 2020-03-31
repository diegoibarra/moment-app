const actions = {
    addMoment: (store, newMoment) => {
        var newMoments = store.state.moments
        newMoments[newMoment.message] = newMoment
        store.setState({moments: newMoments})
    },
    // passing in the id of the moment to remove
    removeMoment: (store, momentToRemove) => {
        var newMoments = store.state.moments
        delete newMoments[momentToRemove]
        store.setState({moments: newMoments})
    },
    updateSignIn: (store, newStatus) => {
        store.setState({...store.state, signedIn: newStatus})
    }
}

export default actions
