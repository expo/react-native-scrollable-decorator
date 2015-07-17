# react-native-scrollable-decorator

The `@scrollable` decorator lets your scrollable React Native components conform to a standard interface, making it easier to compose components. This lets you compose different types of ScrollView-like components while preserving the `ScrollView` API, including methods like `scrollTo`.

See [ScrollableMixin](https://github.com/exponentjs/react-native-scrollable-mixin) for the mixin version of this decorator.

[![npm package](https://nodei.co/npm/react-native-scrollable-decorator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-scrollable-decorator/)

## Installation
```
npm install react-native-scrollable-decorator
```

## Usage

Decorate your scrollable React components with `@scrollbale` and implement `getScrollResponder()`, which must return the underlying scrollable component's scroll responder.

```js
let scrollable = require('react-native-scrollable');

@scrollable
class InfiniteScrollView extends React.Component {

  static propTypes = {
    ...ScrollView.propTypes,
    renderScrollComponent: React.PropTypes.func.isRequired,
  };

  /**
   * IMPORTANT: You must return the scroll responder of the underlying
   * scrollable component from getScrollResponder() when using @scrollable.
   */
  getScrollResponder() {
    return this._scrollView.getScrollResponder();
  },

  setNativeProps(nativeProps) {
    this._scrollView.setNativeProps(nativeProps);
  },

  render() {
    var {
      renderScrollComponent,
      ...props
    } = this.props;
    return React.cloneElement(renderScrollComponent(props), {
      ref: component => {
        this._scrollView = component;
      },
    });
  },
});
```

## Features

By decorating your custom component with `@scrollable`, your component gets the `ScrollView` API. For example:

```js
class App extends React.Component {
  render() {
    return (
      <ListView
        ref={component => { this._scrollView = component; }}
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={...}
        renderRow={...}
      />
    );
  }

  _scrollToTop() {
    // By having all scrollable components conform to the scrollable standard,
    // calling `scrollTo` on your top-level scrollable component will
    // successfully scroll the underlying scroll view.
    this._scrollView.scrollTo(0, 0);
  }
}
```
