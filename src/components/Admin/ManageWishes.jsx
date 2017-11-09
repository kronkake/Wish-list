import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { LinearProgress } from 'material-ui/Progress'

import { Firestore } from '../../Data/Firebase'

import WishForm from './WishForm'
import WishCard from './WishCard'

class ManageWishes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wishes: [],
      loading: true
    }

    this.init = this.init.bind(this)
    this.addWish = this.addWish.bind(this)

  }

  componentWillUpdate() {
    console.log('component did update')
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.finishedAuth && this.props.loggedIn) {
      this.wishesRef = Firestore.collection('users').doc(this.props.uid).collection('wishes')
      console.log(this)
      this.init()
    }
  }

  init() {
    console.log(this.wishesRef)
    this.wishesRef.onSnapshot((wishRef) => {
      const wishes = []
      wishRef.forEach((wishRef) => {
        const wish = wishRef.data()
        wish.id = wishRef.id
        wishes.push(wish)
      })
      this.setState({ wishes: wishes, loading: false })
    });
  }
  addWish({ index, linkToPrisjakt, text, url }) {
    this.wishesRef.add({ 
      index: index, 
      linkToPrisjakt: linkToPrisjakt, 
      text: text, 
      url: url 
    })
      .then(() => {
        console.log('Wish added')
      })
      .catch((error) => console.log(error))
  }
  render() {
    if (!this.props.LoggedIn) {
          return (
              <Redirect to='/' />
          )
    }
    return (
      <section>
        <WishForm 
          addWish={this.addWish}
        />
        {this.state.wishes.length && !this.state.loading === 0 ? 
        <h2>You don't seem to want anything for christmas. Have you been bad?</h2>
         : 
        <h2>Your wishes</h2>}
        {this.state.loading ? <LinearProgress /> : null}
        {
          this.state.wishes.map((wish, i) => {
            return <WishCard 
              key={i}
              editWish={this.editWish}
              deleteWish={this.deleteWish}
              wish={wish}
            />
          })
        }
      </section>
    );
  }
}

export default ManageWishes;
