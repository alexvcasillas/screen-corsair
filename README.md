![Screen Corsair](https://github.com/alexvcasillas/screen-corsair/blob/master/logo/screen-corsair-logotype.jpg?raw=true)

## Screen Corsair

A React Native Navigation Solution

[Why Screen Corsair? Motivations!](#why-screen-corsair-motivations)
[Getting Started with Screen Corsair](#getting-started-with-screen-corsair)
[Creating our Screens](#creating-our-screens)
[The Special One](#the-special-one)

### Why Screen Corsair? Motivations!

I came up with this solution because I needed a simple tabbed screen routing within React Native. I was also looking for something that could be simple to configurate, even almost 0 (zero) config, just a drop-and-go routing library for React Native. That's why, I started building this for my project and then I thought that there has to be people out there wanting something similar, so I open sourced it :)

Obviously there are lots of Routing/Nativation libraries out there and you could choose any of them. This is just, in my opinion, the simplest untill now.

### Getting Started with Screen Corsair

To get started with **Screen Corsair** you have to install it as a dependency of your proyect with `yarn add screen-corsair` or with npm, it won't matter.

After the installation is done, let's get into importing it to our project.

```js
import { ScreenRouter, Screens, AnimatedScreen, Screen, Tabs, Tab } from 'screen-corsair';
```

That's how we import everything we need to start working with **Screen Corsair**, obviously, maybe you won't need all of this imports, and just a few, that's ok, just import what suits for you.

### Creating our Screens

Because **Screen Corsair** is 0 (zero) config, we would only need to use our component in the most declarative way just to make use of the navigation system. Let's take a look at an example:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenRouter, Screens, AnimatedScreen, Screen, Tabs, Tab } from 'screen-corsair';

import Home from './views/home/home.view';
import Settings from './views/settings/settings.view';
import Whatever from './views/whatever/whatever.view';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <ScreenRouter>
            <Screens>
              <Screen name="Home" component={Home} />
              <Screen name="Settings">
                <Settings />
              </Screen>
              <Screen name="Whatever" component={Whatever} />
            </Screens>
            <Tabs>
              <Tab to={'Home'}>
                {active => (
                  <Text allowFontScaling={false} style={{ color: active ? '#339af0' : '#adb5bd' }}>
                    Home
                  </Text>
                )}
              </Tab>
              <Tab to={1}>
                {active => (
                  <Text allowFontScaling={false} style={{ color: active ? '#339af0' : '#adb5bd' }}>
                    Settings
                  </Text>
                )}
              </Tab>
              <Tab to={'Whatever'}>
                {active => (
                  <Text allowFontScaling={false} style={{ color: active ? '#339af0' : '#adb5bd' }}>
                    Whatever
                  </Text>
                )}
              </Tab>
            </Tabs>
          </ScreenRouter>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    display: 'flex',
  },
});
```

That's the basic structure of the **Screen Corsair** use. Now we're going to decompose the example above with more details.

- **ScreenRouter**: this is the main component and should be at the "top-level" of your App, meaning that, it should contain all other of the **Screen Corsair** components in order to make them work together.
- **Screens**: This component accepts **Screen** childrens and is in charge of rending the appropiate screen.
- **Screen**: This is the screen component that will be rendered by the **Screens** component. It takes two props, the first one is the _name_ of the view, and the second one (optional) it's the _component_ that it will render. Take note that the _name_ prop it's mandatory if you're going to make "routing" via names instead of indexes. This component can handle your "views" in two ways, you can pass the "view" it will render via the _component_ prop or directly has a children of this component, it will work both ways so you can choose whatever suits better for your needs.
- **Tabs**: This component accepts **Tab** childrens and will display them inline as it's content.
- **Tab**: This component is in charge of telling our **Screens** component which **Screen** should be rendered via the _to_ prop. You can pass an index (number) to this prop, and it will render the given **Screen** within the **Screens** component (take note that this works like an array and the first **Screen** would be 0 and on). You can also pass a **Screen** name (defined at the **Screen** component's _name_ property) and it will render the **Screen** that matches this name. The **Tab** component is a render-prop type of component, meaning that, it's child it's a function that receives an argument that will tell you wheter this tab is active or not (as shown in the example), this way, you can customize what's inside of your **Tab** component.

And that's it. That's everything you need to know to start working with **Screen Corsair**

### The Special One

There's a special component in **Screen Corsair** that will make your screen animated. That component is the **AnimatedScreen**. It works exactly as the **Screen** component but it animates the content of the **Screen** with a Fade-In effect.
