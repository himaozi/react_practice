import './App.css';
import { getBookList, getPagedBooksList, queryBookByID } from './api';
import React from 'react';
import BookLists from './Components/Mytable';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  componentDidMount() {
    // 请求接口一般在组件的 componentDidMount 周期函数里
    getBookList().then(data => {
      console.log(1, data)
    })
    getPagedBooksList(1, 5).then(data => {
      console.log(2, data)
    })
    queryBookByID(244).then(data => {
      console.log(3, data)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          to do 这里是搜索栏
        </header>
        <div className='App-content'>
          < BookLists />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;