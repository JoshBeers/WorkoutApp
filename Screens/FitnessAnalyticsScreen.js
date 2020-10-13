import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GradientLineChart from './GradientLineChart';

export default class FitnessAnalyticsScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndexStat: 0,
      selectedIndexView: 1,
    };
  }

  handleIndexChangeStat = (selectedIndex) => {
    this.setState({
      ...this.state,
      selectedIndexStat: selectedIndex,
    });
  };

  handleIndexChangeView = (selectedIndex) => {
    this.setState({
      ...this.state,
      selectedIndexView: selectedIndex,
    });
  };

  render() {
    return (
      <View style={styles.workout}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Fitness Tracker</Text>
          <SegmentedControlTab
            values={['Global Statistics', 'Exercise Specific']}
            selectedIndex={this.state.selectedIndexStat}
            onTabPress={this.handleIndexChangeStat}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tab}
            activeTabStyle={{backgroundColor: Colors.btn}}
            tabTextStyle={styles.tabText}
            activeTabTextStyle={{color: Colors.textDark}}
          />
          <SegmentedControlTab
            values={['Day View', 'Week View', 'Month View']}
            selectedIndex={this.state.selectedIndexView}
            onTabPress={this.handleIndexChangeView}
            tabsContainerStyle={styles.tabContainer}
            tabStyle={styles.tab}
            activeTabStyle={{backgroundColor: Colors.btnLite}}
            tabTextStyle={styles.tabText}
            activeTabTextStyle={{color: Colors.textDark}}
          />

          {this.state.selectedIndex === 0 ? (
            <GradientLineChart />
          ) : (
            <GradientLineChart />
          )}
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
    alignSelf: 'center',
    color: Colors.text,
    fontSize: 27,
    marginBottom: 20,
  },
  tabContainer: {
    height: 33,
    backgroundColor: Colors.card,
    marginBottom: 27,
  },
  tab: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.textFieldBackground,
  },
  tabText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
});
