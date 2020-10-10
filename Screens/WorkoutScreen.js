import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const data = [
  //cardio, weights
  {title: 'Arms'},
  {title: 'Abs'},
  {title: 'Rear'},
  {title: 'Legs'},
  {title: 'Back'},
  {title: 'Chest'},
];
const numColumns = 2;
const renderItem = ({item, index}) => {
  return (
    <View Key={index} style={styles.itemContainer}>
      <View style={styles.itemLogo}>
        <Image style={styles.itemImage} source={{uri: ''}} />
      </View>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
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
            activeTabTextStyle={{color: Colors.textDark}}
          />
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            selectedIndex={0}
            itemDimension={130}
            style={styles.gridView}
            spacing={10}
            numColumns={numColumns}
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
    marginBottom: 12,
  },
  tab: {
    backgroundColor: Colors.background,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  activeTab: {
    backgroundColor: Colors.btn,
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
    margin: 5,
    width: 167,
    height: 160,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.text,
    alignSelf: 'center',
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
});
