import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Cardio} from './WorkoutTabs';

export default class ChooseWorkoutScreen extends Component {
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
          {this.state.selectedIndex === 0 ? <Cardio /> : <Cardio />}
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
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
