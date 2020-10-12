import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Abs, Arm, Back, Chest, Rear, WorkoutIcons} from '../img/WorkoutIcons';
import Colors from '../Themes/Colors';

const numColumns = 2;

const cardioData = [
  {title: 'Arms', icon: <Arm />},
  {title: 'Abs', icon: <Abs />},
  {title: 'Rear', icon: <Rear />},
  {title: 'Legs', icon: <WorkoutIcons />},
  {title: 'Back', icon: <Back />},
  {title: 'Chest', icon: <Chest />},
];

const renderItem = ({item, index}) => {
  return (
    <View Key={index} style={styles.itemContainer}>
      <View style={styles.itemLogo}>{item.icon}</View>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

export const Cardio = () => {
  return (
    <FlatList
      key={'_'}
      data={cardioData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.gridView}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      spacing={20}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.card,
    alignItems: 'center',
    margin: 9,
    width: '45%',
    height: 160,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.text,
    alignSelf: 'center',
  },
  itemLogo: {
    margin: 27,
    height: 70,
    alignSelf: 'center',
  },
});
