const momentActions = {
    setColor: (store, newColor) => {
        store.setState({...store.state, color: newColor})
    },
    setDate: (store, newDate) => {
        store.setState({...store.state, date: newDate})
    },
    setMessage: (store, newMessage) => {
        store.setState({...store.state, message: newMessage})
    },
    setHighlight: (store, newHighlight) => {
        store.setState({...store.state, highlight: newHighlight})
    },
    setImage: (store, newImage) => {
        store.setState({...store.state, image: newImage})
    },
    setModal: (store, showModal) => {
        store.setState({...store.state, modal: showModal})
    },
}

export default momentActions
