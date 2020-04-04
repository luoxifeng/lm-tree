import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tree from './components/LMTree';
import { ISelect, IModel } from './components/LMTree/typings';
import { data } from './data';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const [show, setShow] = useState(false);
  const [data1, setData1] = useState<IModel>(data);
  const ref = useRef<Tree>(null);
  const handlerClick = () =>{
    // if (show) {
    //   setData1(data1);
    // }
    setShow(!show);
  }

  const handlerStore = () =>{
    // if (show) {
    //   setData1(data1);
    // }
    // setShow(!show);
    ;
    console.log(ref.current?.recover());
  }
  console.log(data1);

  return (
    <React.StrictMode>
      <div className="App">
        <button onClick={handlerClick}>11111111</button>
        <button onClick={handlerStore}>恢复</button>
        <header className="App-header">
          {
            show &&
            <Tree
              ref={ref}
              data={data1}
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
              onSelect={(selects: ISelect[] = [], l) => {
                const _el = document.querySelector<HTMLDivElement>('#Select');
                if (_el) {
                  const text = selects.map(({ level, select }) => {
                    return `[${select.name}]`
                  }).join('/');
                  _el && (_el.innerHTML = text);
                }
                console.log(1111);
                // l && setData1(l);
              }}

            // getTitle={(index) => {
            //   return ['集团', '总部',"1级","2级","3级"][index] ||'';
            // }}
            />
          }


        </header>
        <div>你的选择是<div id="Select" /></div>
      </div>
    </React.StrictMode>

  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
