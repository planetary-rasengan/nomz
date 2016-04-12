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
  ActivityIndicatorIOS,
  Dimension
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var myIcon = (<Icon name="spoon" size={30} color="#900" />);

var Separator = require('./helpers/separator');
var Post = require('./post');

var api = require('./utils/api');

class Feed extends Component{
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      isLoading: true,
      dataSource: ds,
      error: false,
      user: null
    }

  }

  // On mount, fetch the users feed
  componentDidMount() {
    var userId = this.props.user._id
    api.fetchFeed(userId)
      .then( data => {
        // console.log(data)
        if (data.message === 'Not Found') {// Double check server error
          this.setState({
            error: 'Feed not found for user',
            isLoading: false
          })
        } else {
          this.setState ({
            dataSource: this.state.dataSource.cloneWithRows(data)
          })
        }

    }).done();
  }


  _endLoading() {
    this.state.isLoading = false
  }

  _renderPost(data) {
    // return a view with the passed in data
    return (
      <Post postData={data} />
    )
  }

  render() {
    console.log('feed State:', this.state);
    console.log('feed Props:', this.props)
    return (
      <View style={styles.container}>
        <Image source={{ uri: "nomz" , isStatic: true }} style={styles.bgImg} />
        <View style={styles.container} >
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color='#111'
            size='large' />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderPost.bind(this)}
            onEndReached={this._endLoading.bind(this)} />
        </View>
      </View>
    )
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparant'
  },
  post: {
    borderRadius: 1,
    width: 350,
    height: 350,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
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

  },
  postImage: {
    borderRadius: 5,
    flex: 1
  },
  postUser: {
    marginTop: 10,
    color: '#900'
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
    flexDirection: 'column'
  },
  caption: {
    color: '#333'
  }


})

module.exports = Feed;