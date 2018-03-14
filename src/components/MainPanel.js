import React, { Component } from 'react';
import '../styles/MainPanel.css'
import PersonList from './PersonList'

class MainPanel extends Component {
  render() {
    return (
      <div className="MainPanel">
        <header className="MainPanel-header">
          <h1 className="MainPanel-title">Group Gate</h1>
        </header>

        <body className="MainPanel-body">


            <p className="MainPanel-intro">
                Body goes here, edit <code>src/comonents/MainPanel.js</code> and save to reload.
            </p>

            <p> Here is some data example pulled from the original simple graphql API: </p>

            <PersonList />

        </body>

        <footer className="MainPanel-footer">
            <br/><p> FOOTER goes here</p>
        </footer>

      </div>
    );
  }
}

export default MainPanel;
