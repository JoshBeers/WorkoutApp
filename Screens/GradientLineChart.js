import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {Grid, LineChart} from 'react-native-svg-charts';

export default class GradientLineChart extends PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

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
          contentInset={{top: 20, bottom: 20}}
          svg={{
            strokeWidth: 2,
            stroke: 'url(#gradient)',
          }}>
          <Grid />
          <Gradient />
        </LineChart>
      </View>
    );
  }
}
