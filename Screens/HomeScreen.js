import React from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { ProgressCircle } from 'react-native-svg-charts';

export default class HomeScreen extends React.Component{
    stepPercentage = .60; //Place holder variable
    stepCount = 2500; // Place holder variable
    render() {
        return(
            <View style={styles.home}>
                    <Card containerStyle={styles.stepsCard}>>
                        <ProgressCircle
                            progress={this.stepPercentage}
                            style={{
                                height: 100,
                            }}
                            progressColor={'#066DA1'}
                            backgroundColor={'#181D1F'}/>
                        <Text style={styles.stepText}>
                            {this.stepCount}
                        </Text>
                    </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#1C2224',
        flex: 1,
    },
    stepsCard: {
        marginTop: 50,
        width: 366,
        backgroundColor: '#404A4F',
        borderWidth: 0,
        alignSelf: 'center',
    },
    calendarCard: {
    },
    waterCard: {
    },
    caffeineCard: {
    },
    bottomMenu: {
    },
    stepText: {
        color: 'white',
        fontSize: 27,
        alignSelf: 'center',
        marginLeft: 20,
    },
});
