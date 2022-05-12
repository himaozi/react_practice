import logo from './logo.svg';
import './App.css';
import { getBookList, getPagedBooksList ,queryBookByID} from './api';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  componentDidMount() {
    // 请求接口一般在组件的 componentDidMount 周期函数里
    getBookList().then(data => {
      console.log(1,data)
    })
    getPagedBooksList(1, 5).then(data => {
      console.log(2,data)
    })
    queryBookByID(244).then(data=>{
      console.log(3,data)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;