import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tree, { ISelect } from './components/LMTree';
import { data } from './data';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <Tree
          data={data}
          onlyOne={!true}
          onChange={(selects: ISelect[] = []) => {
            console.log(selects);
            const _el = document.querySelector<HTMLDivElement>('#Select');
            if (_el) {
              const text = selects.map(({ level, select }) => {
                return `[${select.name}]`
              }).join('/');
              _el && (_el.innerHTML = text);
            }
          }}
        // getTitle={(index) => {
        //   return ['集团', '总部',"1级","2级","3级"][index] ||'';
        // }}
        />
        
      </header>
      <div>你的选择是<div id="Select" /></div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
