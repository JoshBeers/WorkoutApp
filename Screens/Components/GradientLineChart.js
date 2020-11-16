import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';

export default class GradientLineChart extends PureComponent {
  render() {
    const data = [85, 50, 10, 40, 95, -4, -24];
    const xAxisDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const xAxisMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const yAxis = [];
    const contentInset = {top: 20, bottom: 20};

    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
          <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
        </LinearGradient>
      </Defs>
    );

    return (
      <View style={{marginVertical: 43, flexDirection: 'row'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{fontSize: 10, fill: 'white'}}
          numberOfTicks={7}
          formatLabel={(value) => `${value}ºC`}
        />
        <LineChart
          style={{height: 200, flex: 1}}
          data={data}
          contentInset={contentInset}
          svg={{
            strokeWidth: 2,
            stroke: 'url(#gradient)',
          }}>
          <Grid />
          <Gradient />
        </LineChart>
        <XAxis
          data={data}
          style={{marginHorizontal: -10}}
          contentInset={contentInset}
          svg={{fontSize: 10, fill: 'white'}}
          formatLabel={(value) => xAxisDay[value]}
        />
      </View>
    );
  }
}
