import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { LinearProgress } from 'material-ui/Progress'
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch'
import Paper from 'material-ui/Paper'

import { Firestore } from '../../../../Data/Firebase'

import WishForm from './WishForm'
import WishCardList from './WishCards/WishCardsList'

class ManageWishes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wishes: [],
      loading: false,
      userId: '',
      disableDragAndDrop: false
    }

    this.addWish = this.addWish.bind(this)
    this.deleteWish = this.deleteWish.bind(this)
    this.editWish = this.editWish.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.setDragAndDrop = this.setDragAndDrop.bind(this)

  }
  componentDidMount() {
      this.setState({ userId: this.props.Auth.uid })
      this.wishesRef = Firestore.collection('users')
        .doc(this.props.Auth.uid)
        .collection('wishes')
  }
  addWish({ index, linkToPrisjakt, text, url }) {
    url = this.formatUrl(url)
    linkToPrisjakt = this.formatUrl(linkToPrisjakt)

    this.wishesRef.add({ 
      index: this.props.User.wishes.length + 1, 
      linkToPrisjakt: linkToPrisjakt, 
      text: text, 
      url: url
    })
      .then(() => {
        console.log('Wish added')
    })
      .catch((error) => console.log(error))
  }
  formatUrl(url) {
    if (url) {
      return url.includes('http') ? url : 'https://' + url
    }
    return url
  }
  deleteWish(id) {
    if (this.state.loading) {
      return
    }
    this.setState({ loading: true })
    this.wishesRef
      .doc(id)
      .delete()
      .then(() => { 
        console.log('Wish is deleted')
        this.setState({ loading: false })
      })
      .catch((error) => console.log(error))
  }
  editWish({ index, linkToPrisjakt, text, url, id }) {
    this.wishesRef
      .doc(id)
      .set({
         index: index, 
         linkToPrisjakt: linkToPrisjakt, 
         text: text, 
         url: url
      })
      .then(() => console.log('Wish is updated'))
      .catch((error) => console.log(error))
  }
  reOrderList(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    result.forEach((item, index) => {
      item.index = index + 1
    })

    return result;
  }
  createBatch(items, ref, firestore) {
    const batch = firestore.batch()
    items.forEach((item) => {
      batch.update(ref.doc(item.id), { 'index': item.index })
    })
    return batch
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination || this.state.loading) {
      return
    }

    this.setState({ loading: true })

    const items = this.reOrderList(
      this.props.User.wishes,
      result.source.index,
      result.destination.index
    )

    this.setState({ wishes: items })

    const batch = this.createBatch(items, this.wishesRef, Firestore)
    
    batch.commit()
      .then(response => this.setState({ loading: false }))
      .then(error => console.error(error))

  }
  onDragStart() {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }
  }
  setDragAndDrop(event, checked) {
    this.setState({ disableDragAndDrop: checked })
  }

  render() {
    if (!this.props.Auth.loggedIn && this.props.Auth.finishedAuth) {
          return (
              <Redirect to='/' />
          )
    }
    return (
      <section>
        <WishForm 
          addWish={this.addWish}
        />
        <Paper style={{ padding:'16px' }}>
          <FormGroup>
            <FormControlLabel
              label='Klikk for å slå av og på muligheten til å kunne rearrangere ønskene. Endring av ønsker fungerer ikke når rearrangering er aktivert'
              control={
                <Switch 
                  checked={this.state.disableDragAndDrop}
                  onChange={this.setDragAndDrop}
                />
              } 
            />
          </FormGroup>
        </Paper>
        {this.props.User.wishes.length === 0 && !this.props.User.loading ? 
        <h2>You don't seem to want anything for christmas. Have you been bad?</h2>
         : 
        <h2>Your wishes</h2>}
        {this.props.User.loading || this.state.loading ? <LinearProgress /> : null}
        <WishCardList 
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          wishes={this.props.User.wishes}
          editWish={this.editWish}
          deleteWish={this.deleteWish}
          disableDragAndDrop={this.state.disableDragAndDrop}
        />
      </section>
    )
  }
}

export default ManageWishes

