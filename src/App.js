import './App.css';
import React from 'react';
import BookLists from './Components/Mytable';
import SearchBooks from './Components/SearchBooks';

// 梳理一下常规数据显示和搜索状态下数据显示的逻辑
// 表格和分页组件的共同作用是：请求数据，渲染表格，渲染分页，设定翻页程序，又因为请求数据的接口一致以及之后每次翻页都要重新请求数据，请求数据放在表格内部更合理
// 两种状态的差异就在于请求数据的参数是否为空，只要通过外部传入book参数即可区别两种请求状态
// 剩下的pageSize和current等信息由表格生成组件BookLists统一管理更方便

class App extends React.Component {
  state = {
    bookParam:[],
  }

 
  getNewBookData = (newBookData) => {
    this.setState({ bookParam: newBookData })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* 将父组件的pageInfo通过props传入 */}
          <SearchBooks getNewBookData={this.getNewBookData} />
        </header>
        <div className='App-content'>
          <BookLists  bookParam={this.state.bookParam}  />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;