import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../Screens/HomeScreen";
import StatisticsScreen from '../Screens/StatisticsScreen';
import ViewAndEditSingleRoutine from '../Screens/ViewAndEditSingleRoutine';
import ChooseAndViewAllRoutinesScreen from "../Screens/ChooseAndViewAllRoutinesScreen";
import CreateNewExerciseScreen from "../Screens/CreateNewExerciseScreen";
import CreateRoutineScreen from "../Screens/CreateRoutineScreen";


export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator();

    const tabBarOptions = {
        showLabel: false,
        style: {
            backgroundColor: "#222222",
            paddingBottom: 12,
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
            <MainStack.Screen name="ViewRoutines" component={ChooseAndViewAllRoutinesScreen} />
            <MainStack.Screen name="Analytics" component={StatisticsScreen} />
            <MainStack.Screen name="CreateExercise" component={CreateNewExerciseScreen}/>
            <MainStack.Screen name="CreateRoutine" component={CreateRoutineScreen}/>
        </MainStack.Navigator>
    );
};
