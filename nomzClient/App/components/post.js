'use strict';

var React = require('react-native');

var {
  Component,
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Dimension
} = React;

var Icon = require('react-native-vector-icons/MaterialIcons');


class Post extends Component{

  render() {
    let nomz = (<Icon  style={styles.nomzIcon} name='room_service' size={20} color='white' />)

    let postUser
    if (this.props.postData.user) {
      postUser = (
          <View style={styles.postInfoRow}>
            <TouchableOpacity 
            underlayColor='transparant'>
              <Text style={styles.postUser}> {this.props.postData.user} </Text>
            </TouchableOpacity>
          </View>
      )
    } else {
      postUser = <View />
    }
    return (
        <View style={styles.post}>

        <View style={styles.imageWrap}>
          <Image 
            style={styles.postImage}
            source={{uri: this.props.postData.imageUrl}}
            resizeMode='stretch'>
            <View style={styles.imgHeader}>
              <Text style={styles.headerText}>{this.props.postData.menuItem.name}</Text>
              {nomz}
            </View>
          </Image>
        </View>
        <View style={styles.postInfo}>
          {postUser}
          <Text style={styles.caption}> { this.props.postData.caption } </Text>
        </View>
      </View>

  )}


}

Post.propTypes = {
  postData: React.PropTypes.object.isRequired
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparant'
  },
  post: {
    borderRadius: 5,
    width: 350,
    height: 350,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    opacity: 2
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  postImageContainer: {
    backgroundColor: 'transparant'
  },
  postImage: {

    borderRadius: 5,
    flex: 1
  },
  postInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postInfo: {
    marginTop: 5,
    marginLeft: 5
  },
  postUser: {
    fontSize: 14,
    color: '#900'
  },
  nomzIcon: {
    top: -5,
    marginRight: 5
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.9
  },
  imageWrap: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'transparant'
  },
  caption: {
    color: '#333'
  },
  imgHeader: {
    backgroundColor:'rgba(2, 2, 2, 0.6)',
    height: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    color: 'white',
    marginTop: 5,
    marginLeft: 5
  }


})

module.exports = Post;