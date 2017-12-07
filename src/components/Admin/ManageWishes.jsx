import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { LinearProgress } from 'material-ui/Progress'

import { Firestore, Firebase } from '../../Data/Firebase'

import WishForm from './WishForm'
import WishCardList from './WishCards/WishCardsList'

import { connect } from 'react-redux'

class ManageWishes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wishes: [],
      loading: true
    }

    this.addWish = this.addWish.bind(this)
    this.deleteWish = this.deleteWish.bind(this)
    this.editWish = this.editWish.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragStart = this.onDragStart.bind(this)

  }
  componentDidMount() {
    this.props.Auth.promise.then(() => {
      this.wishesRef = Firestore.collection('users')
        .doc(this.props.Auth.uid)
        .collection('wishes')
    })
  }
  addWish({ index, linkToPrisjakt, text, url }) {
    url = this.formatUrl(url)
    linkToPrisjakt = this.formatUrl(linkToPrisjakt)

    this.wishesRef.add({ 
      index: this.state.wishes.length + 1, 
      linkToPrisjakt: linkToPrisjakt, 
      text: text, 
      url: url
    })
      .then(() => {
        this.init()
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
        this.setState({ loading: false })
        console.log('Wish is deleted') 
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
      this.state.wishes,
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
      window.navigator.vibrate(100);
    }
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
        {this.state.wishes.length === 0 && !this.state.loading ? 
        <h2>You don't seem to want anything for christmas. Have you been bad?</h2>
         : 
        <h2>Your wishes</h2>}
        {this.props.loadingWishes ? <LinearProgress /> : null}
        <WishCardList 
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          wishes={this.state.wishes}
          editWish={this.editWish}
          deleteWish={this.deleteWish}
        />
      </section>
    )
  }
}

export default connect(mapStateToProps)(ManageWishes)

function mapStateToProps(state, ownProps) {
  return {
    Auth: state.auth,
    User: state.user
  }
}
