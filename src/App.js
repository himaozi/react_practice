import './App.css';
import React from 'react';
import BookLists from './Components/Mytable';
import SearchBooks from './Components/SearchBooks';
class App extends React.Component {
  state = {
    // 存放table的页码pageSize等信息
    pageInfo: {
      pageSize: 10,
      current: 1
    },
    bookList: []
  }

  // 将这个方法 通过props传给BookLists 
  // 供BookList内部在页码,pagesize改变的时候调用改变父组件的state: pageInfo
  // state.pageInfo通过props传给了表单组件
  changePageInfo = (info) => {
    this.setState({ pageInfo: info })
  }
  // 搜索组件请求搜索接口后 调用这个方法 把新的值更新在父组件state: bookList
  // state.bookList通过props传给了table组件
  getNewBookData = (newBookData) => {
    this.setState({ bookList: newBookData })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* 将父组件的pageInfo通过props传入 */}
          <SearchBooks pageInfo={this.state.pageInfo} getNewBookData={this.getNewBookData} />
        </header>
        <div className='App-content'>
          <BookLists bookList={this.state.bookList} changePageInfo={this.changePageInfo} />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;