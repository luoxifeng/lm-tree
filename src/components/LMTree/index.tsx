import React, { Component } from 'react';
import './style.css';

export interface IModel {
  title?: string;
  name?: string;
  open?: boolean;
  children?: IModel[];
}

export interface ISelect {
  level: string | number;
  select: IModel;
}

interface IProps {
  data: IModel,
  index?: number | undefined | string;
  getLevelTitle?: (index?: number) => string;
  onChange?: (args?: any) => void;
  onlyOne?: boolean;
}

/**
 * 递归的把所有的子孙都置为关闭状态
 */
const deepClose = (t: IModel) => {
  t.open = false;
  (t.children || []).forEach(deepClose);
};

export default class Tree extends Component<IProps> {

  static defaultProps = {
    onlyOne: false,
    index: '',
    getLevelTitle: () => ''
  }

  private get list() {
    return (this.props.data.children || []);
  }

  private get currentIndex() {
    return ~~(this.props.index || '');
  }

  private get nextIndex() {
    return this.currentIndex + 1;
  }

  private get active(): IModel {
    let active: any = null;

    this.list.forEach(t => {
      if (!active && t.open) {
        active = t;
        return;
      }
      t.open = false;
    });
    return active;
  }

  private get renderList() {
    const active = this.active;
    if (this.props.onlyOne) {
      if (active) return [active];
    }
    return this.list;
  }

  private handlerClick = (index: number) => {
    const list = this.renderList;
    const curr = list[index];
    const changed = !curr.open; // 缓存当前点击的将要变成的状态

    this.closeAll(); // 关闭所有的
    curr.open = changed; // 然后再把缓存下来的状态更新到当前项
    this.forceUpdate(); //强制更新

    let currSelect: ISelect[] = [];
    if (changed) {
      currSelect.push({
        level: this.currentIndex,
        select: curr
      });
    }

    if (this.props.onChange) {
      this.props.onChange(currSelect);
    }
  }

  private hasChildren(data: IModel) {
    return data.children && data.children.length;
  }

  private closeAll() {
    this.list.forEach(deepClose);
  }

  private onNextChange = (nextLevels: ISelect[] = []) => {
    const { onChange } = this.props;
    const currentSelects = [
      {
        level: this.currentIndex as any,
        select: this.active
      }
    ].concat(nextLevels);

    onChange && onChange(currentSelects);
  }

  public render() {
    const { getLevelTitle, onlyOne } = this.props;
    const { title } = this.props.data;
    const renderList = this.renderList;

    return (
      <div className="lm-tree-group">
        <div className="lm-tree" data-index={this.currentIndex}>
          <div className="lm-tree-header">{title}</div>
          <div className="lm-tree-body">
            {
              renderList.map((data, index) => {
                const hasChildren = this.hasChildren(data);

                return (
                  <div
                    className={`lm-tree-item  ${data.open ? 'lm-tree-open' : ''}`}
                    onClick={() => this.handlerClick(index)}
                    key={index}
                  >
                    <span className="lm-tree-name">
                      {data.name}
                    </span>
                    <span className="lm-tree-icon">
                      {
                        hasChildren && 
                        (data.open ? '-' : '+')
                      }
                    </span>
                  </div>
                );
              })
            }
          </div>
        </div>
        {
          this.active && 
          <Tree 
            data={this.active} 
            index={this.nextIndex}
            getLevelTitle={getLevelTitle}
            onlyOne={onlyOne}
            onChange={this.onNextChange}
          />
        }
      </div>
    );
  }
}
