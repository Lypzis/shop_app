import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
/*
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
*/


import ShopScreen from "../screens/shop/ShopScreen";
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import S

const Stack = createStackNavigator();

const StackNavigatorShop = props => (
    <Stack.Navigator>
        <Stack.Screen />
        <Stack.Screen />
        <Stack.Screen />
        <Stack.Screen />
        <Stack.Screen />
    </Stack.Navigator>
);


/*
const StackNavigatorFilter = props => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "#fff"
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary
    }}
  >
    <Stack.Screen
      name="favoritesScreen"
      options={{ title: "Your Favorites" }}
      component={FilterScreen}
    />
  </Stack.Navigator>
);

const StackNavigatorFavorites = props => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "#fff"
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary
    }}
  >
    <Stack.Screen
      name="favoritesScreen"
      options={{ title: "Your Favorites" }}
      component={Favorites}
    />
    <Stack.Screen
      name="mealDetailScreen"
      options={{ title: "Meal Details" }}
      component={MealDetailScreen}
    />
  </Stack.Navigator>
);

const StackNavigatorMeals = props => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "#fff"
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold"
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans"
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary
    }}
  >
    <Stack.Screen
      name="categoriesScreen"
      options={{ title: "Meal Categories" }}
      component={CategoriesScreen}
    />
    <Stack.Screen
      name="categoryMealScreen"
      options={{ title: "Meals" }}
      component={CategoryMealsScreen}
    />
    <Stack.Screen
      name="mealDetailScreen"
      options={{ title: "Meal Details" }}
      component={MealDetailScreen}
    />
    <Stack.Screen
      name="favoriteScreen"
      options={{ title: "A Screen" }}
      component={Favorites}
    />
  </Stack.Navigator>
);

const TabNavigator = props => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.secondary,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }}
    barStyle={{ backgroundColor: Colors.primary }}
  >
    <Tab.Screen
      name="Meals"
      options={{
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
          ) : (
            "Meals"
          ),
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
          );
        }
      }}
      component={StackNavigatorMeals}
    />
    <Tab.Screen
      name="Favorites"
      options={{
        tabBarLabel:
          Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
          ) : (
            "Favorites"
          ),
        //tabBarLabel: "Favorites!!!!",
        tabBarIcon: tabInfo => {
          return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
        }
      }}
      component={StackNavigatorFavorites}
    />
  </Tab.Navigator>
);

const DrawerNavigator = props => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: Colors.secondary,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }}
  >
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Filter" component={StackNavigatorFilter} />
  </Drawer.Navigator>
);


export default DrawerNavigator;*/
