import React from 'react';

const LayoutContext = React.createContext();

class LayoutProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      header: true,
    };

    this._setLayout = this._setLayout.bind(this);
  }

  _setLayout(layout = 'private') {
    let _state;

    switch (layout) {
      default:
      case 'private':
        _state = {
          header: true,
        };
        break;

      case 'public':
        _state = {
          header: false,
        };
        break;

      case 'static':
        _state = {
          header: true,
        };
        break;
    }

    this.setState(_state);

    return false;
  }

  render() {
    const {header} = this.state;

    return (
      <LayoutContext.Provider
        value={{
          header: header,
          setLayout: this._setLayout,
        }}
      >
        {this.props.children}
      </LayoutContext.Provider>
    );
  }
}

const LayoutConsumer = LayoutContext.Consumer;

export {LayoutProvider, LayoutConsumer};
