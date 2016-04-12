'use strict';

var React = require('react-native');
var Colors = require('../colors');
var Separator = require('../helpers/separator');
var {
  Component,
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} = React;

var deviceWidth = Dimensions.get('window').width;

class UserItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.userImage} source={ {uri: this.props.userData.userImage }} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{this.props.userData.username}</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.userStat}>{this.props.userData.posts.length} Posts</Text>          
              <Text style={styles.userStat}>{this.props.userData.following.length} Following</Text>  
            </View>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    )
  }


}


UserItem.propTypes = {
  userData: React.PropTypes.object.isRequired
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    width: deviceWidth,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 10
  },
  userInfo: {
    flex: 1,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  userStat: {
    marginRight: 10
  },
  userName: {
    color: Colors.red
  },
  separator: {
    backgroundColor: '#E4E4E4',
    height: 1
  }

})

module.exports = UserItem;