import React from 'react';
import './App.css';
import TagsComp from './component/TagsComp'
import Test from './component/Test';
import Ali from './component/Ali';
import Hooks from './component/Hooks/Hooks'
function App () {
  return (
    <div className="App">
      <h1>CRUD</h1>
      <Ali></Ali>
      <br />
      {/* <TagsComp /> */}
      <br />
      {/* <Test></Test> */}
      <br />
      <Hooks></Hooks>
    </div>
  );
}

export default App;
