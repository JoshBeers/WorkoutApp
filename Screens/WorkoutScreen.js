import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SquareGrid from "react-native-square-grid";

class WorkoutScreen extends Component {
    constructor(){
        super();
        this.state = {
            selectedIndex: 0
        };
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    render() {
        return (
            <View style={styles.workout}>
                <Header>

                </Header>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Choose a Workout</Text>
                    <SegmentedControlTab
                        values={['Area of Focus','Activity','Intensity']}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        tabsContainerStyle={styles.tabContainer}
                        tabStyle={styles.tab}
                        activeTabStyle={styles.activeTab}
                        tabTextStyle={styles.tabText }
                        activeTabTextStyle={{ color: '#888888' }}
                    />
                    <SquareGrid />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    workout: {
        backgroundColor: '#1C2224',
        flex: 1,
    },
    header: {

    },
    container: {
        marginVertical: 30,
        marginHorizontal: 30,
    },
    titleText: {
        color: 'white',
        fontSize: 27,
        marginBottom: 20,
    },
    tabContainer: {
        height: 33,
        backgroundColor: '#F2F2F2'
    },
    tab: {
        backgroundColor: '#F2F2F2',
        borderWidth: 0,
        borderColor: 'transparent',
    },
    activeTab: {
        backgroundColor: 'white',
        marginTop: 2,
    },
    tabText: {
        color: '#444444',
        fontWeight: 'bold'
    }
});

module .exports = WorkoutScreen;
