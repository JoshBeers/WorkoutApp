import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import {Header} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SquareGrid from 'react-native-square-grid';

export default class WorkoutScreen extends Component {
  // const DATA = [
  //   {
  //     id: 1,
  //     title: 'First item'
  //   },
  //   {
  //     id: 2,
  //     title: 'Second item'
  //   },
  // ];

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
        <Header />
        <View style={styles.container}>
          <Text style={styles.titleText}>Choose a Workout</Text>
          <SegmentedControlTab
            values={['Area of Focus', 'Activity', 'Intensity']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tab}
            activeTabStyle={styles.activeTab}
            tabTextStyle={styles.tabText}
            activeTabTextStyle={{color: '#888888'}}
          />
          <SquareGrid />
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
  header: {},
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
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: Colors.background,
    margin: 3,
    width: 100,
  },
});
