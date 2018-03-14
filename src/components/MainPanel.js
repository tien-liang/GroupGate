import React, { Component } from 'react';
import '../css/MainPanel.css'

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
        </body>

        <footer className="MainPanel-footer">
            <p> Footer goes here</p>
        </footer>

      </div>
    );
  }
}

export default MainPanel;
