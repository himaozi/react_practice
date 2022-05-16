import React from 'react';
import ReactDOM from 'react-dom';
import GetBookLists from './myTable';
import './index.css';


const root = document.getElementById('root')

const myTable = <div>
  <GetBookLists/>
</div>

ReactDOM.render(myTable,root)