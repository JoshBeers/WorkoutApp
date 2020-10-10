import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const data = [
  //cardio, weights
  {title: 'arms'},
  {title: 'abs'},
  {title: 'rear'},
  {title: 'legs'},
  {title: 'back'},
  {title: 'chest'},
];

const renderItem = ({item, index}) => {
  return (
    <View Key={index} style={styles.itemContainer}>
      <View style={styles.itemLogo}>
        <Image style={styles.itemImage} source={{uri: ''}} />
      </View>
      <View>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
};

export default class WorkoutScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    return (
      <View style={styles.workout}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Choose a Workout</Text>
          <SegmentedControlTab
            values={['Cardio', 'Weights']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
            tabTextStyle={styles.tabText}
            activeTabTextStyle={{color: '#888888'}}
          />
          <FlatList
            data={data}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
            selectedIndex={0}
            itemDimension={130}
            style={styles.gridView}
            spacing={10}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workout: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  container: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  titleText: {
    color: Colors.text,
    fontSize: 27,
    marginBottom: 20,
  },
  tabContainer: {
    height: 33,
    backgroundColor: Colors.card,
  },
  tab: {
    backgroundColor: Colors.card,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  tabText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    backgroundColor: Colors.card,
    margin: 3,
    width: 100,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.text,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
});
