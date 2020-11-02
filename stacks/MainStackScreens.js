import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../Screens/HomeScreen";
import FitnessAnalyticsScreen from '../Screens/FitnessAnalyticsScreen';
import ViewRoutineScreen from '../Screens/ViewRoutineScreen';


export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: "#222222",
            paddingBototm: 12,
        },
    };

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = "ios-home";

            switch (route.name) {
                case "Home":
                    iconName = "ios-home";
                    break;

                case "Analytics":
                    iconName = "ios-chatboxes";
                    break;

                default:
                    iconName = "ios-home";
            }

            if (route.name === "ViewRoutines") {
                return (
                    <Ionicons
                        name="ios-add-circle"
                        size={48}
                        color="#23a8d9"
                        style={{
                            shadowColor: "#23a8d9",
                            shadowOffset: { width: 0, height: 10 },
                            shadowRadius: 10,
                            shadowOpacity: 0.3,
                        }}
                    />
                );
            }

            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />;
        },
    });

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="ViewRoutines" component={ViewRoutineScreen} />
            <MainStack.Screen name="Analytics" component={FitnessAnalyticsScreen} />
        </MainStack.Navigator>
    );
};