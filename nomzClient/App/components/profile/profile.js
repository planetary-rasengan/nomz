'use strict';
var React = require('react-native');
var api = require('../utils/api');
var Colors = require('../colors');

var {
  Text,
  View,
  StyleSheet,
  Image,
  Component,
  SegmentedControlIOS,
  ListView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NavigatorIOS
} = React;

var Post = require('../post.js');
var UserItem = require('./user');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class Profile extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource: ds,
      isLoading: true,
      user: null,
      error: null
    }
  }

  componentWillMount() {
    var id = this.props.user._id;
    api.fetchUser(id)
      .then( (data) => {
        console.log('Profile component mounting, received:', data)
        this.setState({
          isLoading: false,
          user: data
        })
      }).catch( (err) => {
        this.setState({
          isLoading: true,
          error: err
        })
      })
  }

  _onUserItemPress(user) {
    this.setState({isLoading: true})
    api.fetchUser(user._id)
      .then( (data) => {
        this.setState({isLoading: false});
        this.props.navigator.push({
          component: Profile,
          passProps: { user: user }
        })
      })

  }


  render() {
    if (!this.props.user) {
      return (
             <View style={styles.loading}>
                <Text>
                  Loading
                </Text>
            </View>
      )
    }

    let header = (
      <View style={styles.header}>
        <Image style={styles.image} source={ { uri: this.props.user.userImage} } />
        <View style={styles.usernameHolder}>
          <Text style={styles.username}>{this.props.user.username}</Text>
        </View>
        <View style={styles.headerStats}>
          <Text style={styles.stat}><Text style={styles.num}>{this.props.user.posts.length}</Text> Posts</Text>
          <Text style={styles.stat}><Text style={styles.num}>{this.props.user.followers.length}</Text> Followers</Text>
          <Text style={styles.stat}><Text style={styles.num}>{this.props.user.following.length}</Text> Following</Text>
        </View>
      </View>
    )

    let posts = this.props.user.posts.map( (post, idx) => {
      return (
        <View key={idx}>
          <Post postData={post} />
        </View>
      )
    })

    let followers = this.props.user.followers.map( (follower, idx) => {
      return (
        <View key={idx}>
          <TouchableOpacity onPress={() => this._onUserItemPress(follower)}>
            <UserItem userData={follower} />
          </TouchableOpacity>
        </View>
      )
    })

    let following = this.props.user.followers.map( (following, idx) => {
      return (
        <View key={idx}>
          <UserItem userData={following} />
        </View>
      )
    })



    return (
      <View style={styles.container}>
        <Image source={{ uri: "nomz" , isStatic: true }} style={styles.bgImg} />
        {header}
        <ScrollableTabView
          tabBarActiveTextColor={Colors.red}
          >
          <ScrollView tabLabel='Posts' contentContainerStyle={styles.tabView}>
            <View>
              {posts}
            </View>
          </ScrollView>
          <ScrollView tabLabel='Followers' contentContainerStyle={styles.tabView}>
            {followers}
          </ScrollView>
          <ScrollView tabLabel='Following' contentContainerStyle={styles.tabView}>
            {following}
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'rgba(2, 2, 2, 0.6)',
    marginTop: 30,
    paddingTop: 50,
    paddingBottom: 20
  },
  username: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    color: 'white'
  },
  headerStats: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10
  },
  stat: {
    color: 'white',
  },
  num: {
    fontSize: 16,
    color: Colors.pink
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    alignSelf: 'center'
  },
  badge: {
    marginBottom: 0
  },
  tabView: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    alignItems: 'center',
  },
    bgImg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.9
  }
})

module.exports = Profile;
