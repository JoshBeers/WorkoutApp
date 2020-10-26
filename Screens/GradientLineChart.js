import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {Grid, LineChart, XAxis} from 'react-native-svg-charts';
import Colors from '../Themes/Colors';

export default class GradientLineChart extends PureComponent {
  render() {
    const data = [85, 50, 10, 40, 95, -4, -24];
    const xAxis = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const yAxis = [];

    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
          <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
        </LinearGradient>
      </Defs>
    );

    return (
      <View style={{marginVertical: 43}}>
        <LineChart
          style={{height: 200}}
          data={data}
          contentInset={{top: 10, bottom: 10}}
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
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 10, fill: 'white'}}
          formatLabel={(value) => xAxis[value]}
        />
      </View>
    );
  }
}
