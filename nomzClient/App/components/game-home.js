var React = require('react-native');
var Meal = require('./Meal');

var {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
  TabBarIOS,
  ActivityIndicatorIOS
} = React;


class Game extends Component {
  constructor() {
    super();
    this.state = {
      mealSelection: null,
      selectedTab: 'tabTwo'
    }
  }

  setTab(tabId) {
    this.setState({ selectedTab: tabId })
  }



  render() {

    console.log("hello")
    return (
        <TabBarIOS
          tintColor='red'>
          <TabBarIOS.Item 
            systemIcon='history'
            selected={ this.state.selectedTab === 'tabOne'}
            onPress={ () => this.setTab('tabOne') }>
            <View style={styles.tabContent}>
              <Text style={styles.tabText}> Tab One </Text>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon='search'
            selected={ this.state.selectedTab === 'tabTwo'}
            onPress={ () => this.setTab('tabTwo') }>
            <Meal />
          </TabBarIOS.Item>
          <TabBarIOS.Item 
            systemIcon='more'
            selected={ this.state.selectedTab === 'tabThree'}
            onPress={ () => this.setTab('tabThree') }>
            <View style={styles.tabContent}>
              <Text style={styles.tabText}> Tab Three </Text>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
    )
  }


}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 45
  },
  myText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'green'
  }
})


module.exports = Game;