import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Post = (props) => {
  const { id, title, body } = props.post;
  
  return (
    <View 
      key={id}
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleItem}>{id}</Text>
        <Text style={styles.titleItem}>{title}</Text>
      </View>
      <Text>{body}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
    color: 'tomato',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 8
  },
  
  title: {
    flexDirection: 'row'
  },
  
  titleItem: {
    color: 'tomato',
    fontWeight: 'bold',
    paddingLeft: 6
  }
});