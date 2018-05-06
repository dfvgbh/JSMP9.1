import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Post } from './components/Post';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  refreshData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ data });
      });
  };

  componentDidMount() {
    this.refreshData();
  }
  
  renderItem = ({item}) => (
    <Post post={item} />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
