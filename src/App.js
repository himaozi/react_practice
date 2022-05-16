import './App.css';
import React from 'react';
import BookLists from './Components/Mytable';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

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