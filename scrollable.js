'use strict';

let React = require('react-native');

function scrollable(DecoratedComponent) {
  return class extends React.Component {
    static displayName = `Scrollable(${getDisplayName(DecoratedComponent)})`;
    static DecoratedComponent = DecoratedComponent;

    setNativeProps(nativeProps) {
      this._root.setNativeProps(nativeProps);
    }

    getScrollResponder() {
      return this._root.getScrollResponder();
    }

    getInnerViewNode() {
      return this.getScrollResponder().getInnerViewNode();
    }

    scrollTo(destY?: number, destX?: number) {
      this.getScrollResponder().scrollTo(destY, destX);
    }

    scrollWithoutAnimationTo(destY?: number, destX?: number) {
      this.getScrollResponder().scrollWithoutAnimationTo(destY, destX);
    }

    render() {
      return (
        <DecoratedComponent
          {...this.props}
          ref={component => { this._root = component; }}
        />
      );
    }
  }
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

module.exports = scrollable;
