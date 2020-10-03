import React from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import {Card} from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import { ProgressCircle } from 'react-native-svg-charts';
import moment from 'moment';
import Colors from '../Themes/Colors';

export default class HomeScreen extends React.Component{
    stepPercentage = .60; //Place holder variable
    stepCount = 2500; // Place holder variable
    today = moment().format("YYYY-MM-DD");
    render() {
        return(
            <View style={styles.home}>
                <Card containerStyle={styles.stepsCard}>
                    <ProgressCircle
                        progress={this.stepPercentage}
                        style={{
                            height: 100,
                        }}
                        progressColor={Colors.btn}
                        backgroundColor={Colors.background}/>
                    <Text style={styles.stepText}>
                        {this.stepCount} STEPS
                    </Text>
                </Card>
                <Card containerStyle = {styles.calendarCard}>
                    <CalendarStrip
                    scrollable
                    style={{
                        height: 100,
                        backgroundColor: Colors.card,
                        paddingTop: 10,
                    }}
                    calendarColor={Colors.card}
                    calendarHeaderStyle={{color: Colors.text}}
                    dateNumberStyle={{color: Colors.text}}
                    dateNameStyle={{color: Colors.text}}
                    />
                </Card>
            </View>
        )
    }
}

const dummyDates = [];

const styles = StyleSheet.create({
    home: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    stepsCard: {
        marginTop: 50,
        width: 366,
        backgroundColor: Colors.card,
        borderWidth: 0,
        alignSelf: 'center',
    },
    calendarCard: {
        backgroundColor: Colors.card,
        borderWidth: 0,
        width: 366,
        alignSelf: 'center',
    },
    waterCard: {
    },
    caffeineCard: {
    },
    bottomMenu: {
    },
    stepText: {
        color: Colors.text,
        fontSize: 27,
        alignSelf: 'center',
        marginTop: 7,
    },
});
