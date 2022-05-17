import './App.css';
import React from 'react';
import BookLists from './Components/Mytable';
import SearchBooks from './Components/SearchBooks';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 10,
      current: 1,
      total: 0,
      book:[],
      bookList: [],
  }

  }
  
  changeState = (newBook) =>{
    this.setState({
      book:newBook,
    })
    console(newBook)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <SearchBooks changeBook={this.changeState}/>
        </header>
        <div className='App-content'>
          < BookLists  state={this.state} />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;