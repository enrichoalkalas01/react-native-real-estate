// Library
import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Constant
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";

// Context
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

export default function SignIn() {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if (!loading && isLoggedIn) return <Redirect href="/" />;

    const handleLoginButton = async () => {
        const result = await login();
        if (result) {
            refetch();
        } else {
            console.log("Login Failed");
            Alert.alert("Error", "Failed to login with google");
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image
                    source={images.onboarding}
                    className="w-full h-4/6"
                    resizeMode="contain"
                />
                <View className="px-10">
                    <Text className="text-base text-center uppercase font-rubik text-black-200 mb-2">
                        Welcome to Re-Estate
                    </Text>
                    <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's get your closer to{"\n"}
                        <Text className="text-primary-300 font-rubik-bold text-center">
                            Your Ideal Home
                        </Text>
                    </Text>

                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                        Login to Re-Estate with google
                    </Text>

                    <TouchableOpacity
                        onPress={handleLoginButton}
                        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center gap-x-4">
                            <Image
                                source={icons.google}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
