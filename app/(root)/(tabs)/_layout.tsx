import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import icons from "@/constants/icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string; }) => {
        return(
            <View className="flex-1 mt-3 flex flex-col items-center">
                <Image
                    source={icon}
                    tintColor={focused ? "#0061FF" : "#666876"}
                    resizeMode="contain"
                    className="size-6"
                />
                <Text className={`${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-center mt-1`}>
                    {title}
                </Text>
            </View>
        )
    }

    return (
        <Tabs
            screenOptions={{
                // tabBarButton: HapticTab,
                // tabBarBackground: TabBarBackground,
                // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                // headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {
                        backgroundColor: "white",
                        position: "absolute",
                        borderTopColor: "#0061FF1A",
                        borderTopWidth: 1,
                        minHeight: 70,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.home} focused={false} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.search} focused={false} title="Explore" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabIcon icon={icons.person} focused={false} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
}
