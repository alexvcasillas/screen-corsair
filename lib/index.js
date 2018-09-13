import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

const { Provider, Consumer } = React.createContext();

export class ScreenRouter extends React.Component {
  state = { activeScreen: 0 };

  navigateTo = toScreen => {
    const { activeScreen } = this.state;
    if (activeScreen === toScreen) return;
    this.setState({ activeScreen: toScreen });
  };

  render() {
    const router = {
      activeScreen: this.state.activeScreen,
      navigateTo: this.navigateTo,
    };
    return <Provider value={router}>{this.props.children}</Provider>;
  }
}

export class Screens extends React.Component {
  state = { activeScreen: 0 };

  _renderActiveScreen = activeScreen => {
    const paramType = typeof activeScreen;
    const { children } = this.props;
    const activeChild = React.Children.map(children, (child, i) => {
      if (paramType === 'number') {
        if (i === activeScreen) return child;
      } else {
        const { name } = child.props;
        if (name === activeScreen) return child;
      }
    });
    if (activeChild.length === 0) return children[0];
    return activeChild;
  };

  render() {
    const { children } = this.props;
    return (
      <Consumer>
        {router => <View style={styles.screens.wrapper}>{this._renderActiveScreen(router.activeScreen)}</View>}
      </Consumer>
    );
  }
}

export class AnimatedScreen extends React.Component {
  componentWillMount() {
    this.animatedScreen = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedScreen, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { children, component } = this.props;
    const animatedScreen = { opacity: this.animatedScreen };
    return (
      <Animated.View style={[styles.screen.wrapper, animatedScreen]}>
        {children ? children : React.createElement(component)}
      </Animated.View>
    );
  }
}

export const Screen = ({ children, component }) => (
  <View style={styles.screen.wrapper}>{children ? children : React.createElement(component)}</View>
);

export const Tabs = ({ children }) => (
  <View style={styles.tabs.wrapper}>
    {React.Children.map(children, (child, i) => React.cloneElement(child, { index: i }))}
  </View>
);

export const Tab = ({ children, index, to }) => (
  <Consumer>
    {router => (
      <TouchableWithoutFeedback onPress={() => router.navigateTo(to)}>
        <View style={styles.tab.wrapper}>{children(router.activeScreen === to || router.activeScreen === index)}</View>
      </TouchableWithoutFeedback>
    )}
  </Consumer>
);

const styles = {
  screens: StyleSheet.create({
    wrapper: { flex: 1 },
  }),
  screen: StyleSheet.create({
    wrapper: { flex: 1 },
  }),
  tabs: StyleSheet.create({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
  }),
  tab: StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
};
