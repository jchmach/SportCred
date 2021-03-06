import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Post from '../component/Post';
import profile_img from '../assets/profile_img.jpg';
import logo_png from '../assets/logo_png.png';
import StephenASmith from '../assets/StephenASmith.png';
import { ScrollView } from 'react-native-gesture-handler';
import search_img from '../assets/search_18dp.png'
import { useNavigation } from '@react-navigation/native';
import NewPostComponent from '../component/NewPost';
import { getAllPosts } from '../controller/post';
import { connect } from "react-redux";
import { getUser } from '../controller/user';
import notif from '../assets/notif.png'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';


class OpenCourtScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: 'NAME',
            profilePic: StephenASmith,
            posts: [],
            acs: 0,
            renderPosts: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getUser(this.props.currentUser)
            .then((result) => {
                console.log("----------------------")
                console.log(result)
                this.setState({ userName: result.user.username, acs: result.user.acs })
            }).then(() => {
                this.realPosts().then((resp) => {
                    this.setState({ posts: resp, isLoading: false })
                }).then(() => {
                    this.setState({
                        renderPosts: this.state.posts.map((d, idx) => <Post key={idx} id={d._id} name={d.title} profilePic={d.profilePic} post={d.description} acs={d.acs}></Post>)
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    realPosts = async () => {
        const result = await getAllPosts();
        if (result.status === 200) {
            console.log(result)
            return result.postsArray;
        } else {
            alert("Something went wrong!")
        }
    }

    render() {
        if (this.state.isLoading) {
            return null
        }
        console.log(this.state)
        return (
            <View style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Inbox')}
                    >
                        <Image
                            style={styles.notif_img}
                            source={notif}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.search_button}
                        onPress={() => this.props.navigation.navigate('Search')}
                    >
                        <Image
                            style={styles.search_img}
                            source={search_img}
                        />
                    </TouchableOpacity>
                </View>
                <NewPostComponent userName={this.state.userName} profilePic={this.state.profilePic} />
                <ScrollView>
                    <View style={styles.posts}>
                        {this.state.renderPosts}
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    posts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    screen: {
        backgroundColor: '#333436',
        height: '100%',
        paddingTop: 20
    },
    search_img: {
        height: 40,
        width: 40,
        marginRight: 20,
        marginBottom: 20,
        tintColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    search_button: {
        height: 20,
        width: 20,
        marginRight: 20
    },
    notif_img: {
        height: 40,
        width: 40,
        marginLeft: 10,
        tintColor: 'white',
    }
})

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};
export default connect(mapStateToProps, {})(OpenCourtScreen);