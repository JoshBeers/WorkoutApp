import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GradientLineChart from './GradientLineChart';
import {Calories, Duration, Workouts} from '../img/AnalyticsIcons';

export default class StatisticsScreen extends Component {
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

          <View style={styles.resultView}>
            <View style={styles.resultContainer}>
              <View style={styles.resultLogo}>
                <Duration />
              </View>
              <View style={styles.dataBox}>
                <View>
                  <Text style={styles.resultTitle}>Duration</Text>
                  {/*// store this text result in state*/}
                  <Text style={styles.resultTitle}>1:17 hr</Text>
                </View>
              </View>
            </View>
            <View style={styles.resultContainer}>
              <View style={styles.resultLogo}>
                <Calories />
              </View>
              <View style={styles.dataBox}>
                <Text style={styles.resultTitle}>Calories</Text>
                <Text style={styles.resultTitle}>498 kcal</Text>
              </View>
            </View>
            <View style={styles.resultContainer}>
              <View style={styles.resultLogo}>
                <Workouts />
              </View>
              <View>
                <View style={styles.dataBox}>
                  <Text style={styles.resultTitle}>Workouts</Text>
                  <Text style={styles.resultTitle}>8</Text>
                </View>
              </View>
            </View>
          </View>
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
  resultView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    padding: 8,
    margin: 7,
    width: 117,
    height: 70,
  },
  dataBox: {
    marginLeft: 11,
  },
  resultTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.text,
  },
  resultLogo: {
    marginVertical: 7,
  },
});
