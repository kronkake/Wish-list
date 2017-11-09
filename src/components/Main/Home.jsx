import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import './styles/Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Component</h1>
        <section className="PaperWrap">
          <Paper square={true} className="PaperLink Quiz-start">
            <Link to="/quiz">Start Quiz</Link>
          </Paper>
          <Paper square={true} className="PaperLink">
            <Link to="/manageUsers">Manage Users</Link>
          </Paper>
        </section>
      </div>
    );
  }
}

export default Home;
