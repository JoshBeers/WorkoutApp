import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import GradientLineChart from './Components/GradientLineChart';
import DropDownPicker from 'react-native-dropdown-picker';
import {Calories, Duration, Workouts} from '../img/AnalyticsIcons';
import {getAllExerciseStats} from '../Classes/Exercise';

export default class StatisticsScreen extends Component {
  constructor() {
    super();
    this.state = {
      exerciseStatsList: [],
      selected: null,
    };
  }

  componentDidMount() {
    getAllExerciseStats((exersizeStatlist) => {
        this.setState(
            {
              exerciseStatsList: exersizeStatlist,
            },
            function () {
              console.log('stats screen stats gotten  ', this.state);
              // console.log(this.state.exerciseNames())
              // console.log('name list: ', this.state.nameList);
            },
        );
    });
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

  // Getting all the exercise stats names
  exerciseNames(callback) {
    let listNames = [];
    for (let i = 0; i < this.state.exerciseStatsList.length; i++) {
      let name = this.state.exerciseStatsList[i].exerciseName;
      console.log('The names of the exercises in the stat list: ' + name);
      listNames.push(name);
    }
    if(callback)
      callback(listNames)
  }

  render() {
    return (
      <View style={styles.workout}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Fitness Tracker</Text>

          <DropDownPicker
            items={this.state.exerciseStatsList.map( function (val){
              return {
                label : val.exerciseName,
                value : val
              }
                }
            )}
            containerStyle={{height: 40}}
            style={{backgroundColor: Colors.card}}
              labelStyle={{color: Colors.text}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: Colors.card}}
            onChangeItem={(item) =>
              this.setState({
                selected: item.value,
              })
            }
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
