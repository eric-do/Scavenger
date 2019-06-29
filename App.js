import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import LandmarkList from './screens/LandmarkList.js';
import LandmarkView from './screens/LandmarkView.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const LOCALHOST = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      landmarks: []
    }
  }

  componentDidMount() {
      fetch(`http://localhost:3000/landmarks?id=${this.state.id}`)
        .then(data => data.json())
        .then(landmarks => {
          this.setState({ landmarks })
        })
        .catch(e => console.error('Couldn\'t get data', e));
  }

  render() {
    console.log(this);
    return (
      <View style={styles.container}>
        {/* <LandmarkList landmarks={this.state.landmarks}/> */}
        <View style={styles.container}>
          <FlatList
            data={this.state.landmarks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.container}
                      onPress={() => this.props.navigation.navigate('Landmark')} >
                  {item.name}
                </Text>                    
                <Image style={styles.image}
                       source={{ uri: `${LOCALHOST}${item.url}` }}
                       onPress={() => this.props.navigation.navigate('Landmark')} />
              </View>
            )}
          />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 200
  }
});

const AppNavigator = createStackNavigator({
  Home: App,
  Landmark: LandmarkView
})

export default createAppContainer(AppNavigator);
