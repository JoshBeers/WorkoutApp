import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import FitnessAnalyticsScreen from "../Screens/FitnessAnalyticsScreen";
import ViewRoutineScreen from "../Screens/ViewRoutineScreen"
import Colors from "../Themes/Colors";


const Tab = createBottomTabNavigator();

export default class NavBar extends React.Component{
    render() {
        return(
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size}) =>{
                        let icon;

                        if(route.name === 'Home'){
                            icon = focused;
                        } else if (route.name === 'Progress'){
                            icon = focused;
                        } else if (route.name === 'View Routines'){
                            icon = focused;
                        }
                        return <Ionicons name = {icon} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: Colors.btn,
                    inactiveTintColor: Colors.card,
                }}
            >
                <Tab.Screen name= "Home" component={HomeScreen}/>
                <Tab.Screen name= "Progress" component={FitnessAnalyticsScreen}/>
                <Tab.Screen name= "View Routines" component={ViewRoutineScreen}/>
            </Tab.Navigator>
        );
    }
}
