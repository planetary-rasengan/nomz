var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} = React;

class Meal extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.myText}> Breakfast </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.myText}> Lunch </Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green'
  },

  box: {
    padding: 10,
    width: 150,
    height: 150,
    marginTop: 30,
    backgroundColor: 'red'

  },

  myText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'blue',
    marginTop: 50
  }


})

module.exports = Meal;