import React, { Component } from 'react';
import { IModel, ISelect } from './typings';
import './style.css';

interface IProps {
  data: IModel,
  level?: number | undefined | string;
  getLevelTitle?: (level?: number) => string;
  onChange?: (selectList?: ISelect[], data?: IModel) => void;
  onSelect: (selectList?: ISelect[], data?: IModel) => void;
  onlyOne?: boolean;
}

export default class Tree extends Component<IProps> {

  static defaultProps = {
    onlyOne: false,
    level: 0,
    getLevelTitle: () => '',
    onSelect() { }
  }

  private selectList: ISelect[] = this.initSelectList || [];

  private get initSelectList() {
    const { data } = this.props;
    if (this.currentIndex || !data) {
      return []
    }
    const loop = (model: IModel, i = 0, list: ISelect[] = []): ISelect[] => {
      const { active, children = [] } = model;
      if (active) {
        list.push({
          level: i,
          select: model
        });
      }
      return list.concat(
        ...children.map(t => {
          return loop(t, i++);
        })
      );
    }

    return loop(data);
  }

  private get list() {
    return (this.props.data.children || []);
  }

  private get currentIndex() {
    return ~~(this.props.level || '');
  }

  private get opened(): IModel | null {
    let opened: any = null;

    this.list.forEach(t => {
      if (!opened && t.open) {
        opened = t;
        return;
      }
      t.open = false;
    });

    return opened;
  }

  private get renderList() {
    const opened = this.opened;
    if (this.props.onlyOne) {
      if (opened) return [opened];
    }
    return this.list;
  }

  private handlerToggle = (index: number) => {
    const list = this.renderList;
    const curr = list[index];
    const open = !curr.open;

    this.closeAll();
    curr.open = open;
    this.forceUpdate();
  }

  private hasChildren(data: IModel) {
    return data.children && data.children.length;
  }

  private commonDeep = (key: 'active' | 'open') => () =>
    this.list.forEach(function deep(t: IModel) {
      t[key] = false;
      (t.children || []).forEach(deep);
    })

  private closeAll = this.commonDeep('open');

  private unActiveAll = this.commonDeep('active');

  private handlerSelect = (curr: IModel) => (
    nextLevels: ISelect[] = []
  ) => {
    const { onSelect } = this.props;
    const currentSelects = [
      {
        level: this.currentIndex,
        select: curr
      },
      ...nextLevels
    ];

    if (this.currentIndex) {
      return onSelect(currentSelects);
    }

    this.unActiveAll();
    currentSelects.forEach(({ select }) => {
      select && (select.active = true);
    })
    this.selectList = currentSelects;
    this.recover();
    onSelect(this.selectList);
  }

  public recover() {
    this.closeAll();
    this.selectList.slice(0, -1).forEach(({ select }) => {
      select && (select.open = true);
    });
    this.forceUpdate();
  }

  public render() {
    const { getLevelTitle, onlyOne, data } = this.props;
    const { title } = data;
    const renderList = this.renderList;

    return (
      <div className="lm-tree-group">
        <div className="lm-tree" data-level={this.currentIndex}>
          <div className="lm-tree-header">{title}</div>
          <div className="lm-tree-body">
            {
              renderList.map((data, index) => {
                const hasChildren = this.hasChildren(data);

                return (
                  <div
                    className={`lm-tree-item  ${data.active ? 'lm-tree-select' : ''} ${data.open ? 'lm-tree-open' : ''}`}
                    key={index}
                  >
                    <span
                      className="lm-tree-name"
                      onClick={() => this.handlerSelect(data)([])}
                    >
                      {data.name}
                    </span>
                    <span className="lm-tree-icon">
                      {
                        hasChildren &&
                        <span
                          onClick={() => this.handlerToggle(index)}
                        >
                          {data.open ? ' - ' : ' + '}
                        </span>
                      }
                    </span>
                  </div>
                );
              })
            }
          </div>
        </div>
        {
          this.opened &&
          <Tree
            data={this.opened}
            level={this.currentIndex + 1}
            getLevelTitle={getLevelTitle}
            onlyOne={onlyOne}
            onSelect={this.handlerSelect(this.opened)}
          />
        }
      </div>
    );
  }
}
