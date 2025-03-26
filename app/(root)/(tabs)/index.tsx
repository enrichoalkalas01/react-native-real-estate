import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCards } from "@/components/Cards";

export default function HomeScreen() {
    return (
        <SafeAreaView className="bg-white h-full">
            <View className="px-5">
                {/* Profile */}
                <View className="flex flex-row items-center justify-between mt-5">
                    <View className="flex flex-row items-center gap-2">
                        <TouchableOpacity>
                            <Image
                                source={images.avatar}
                                className="size-12 rounded-full"
                            />
                        </TouchableOpacity>
                        <View className="flex flex-col items-start ml-2 justify-center">
                            <Text className="text-xs font-rubik text-black-100">
                                Good Moring
                            </Text>
                            <Text className="text-base font-rubik-medium text-black-300">
                                Enricho Alkalas
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image source={icons.bell} className="size-6 mr-2" />
                    </TouchableOpacity>
                </View>

                <Search />

                <View className="my-5 px-1">
                    {/* Featured All */}
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-rubik-bold text-black-300">
                            Featured
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-base font-rubik-bold text-primary-300">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row gap-5 mt-5">
                        <FeaturedCards />
                        <FeaturedCards />
                        <FeaturedCards />
                    </View>

                    {/* Recommendation */}
                    <View className="flex flex-row items-center justify-between mt-5">
                        <Text className="text-xl font-rubik-bold text-black-300">
                            Our Recomendation
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-base font-rubik-bold text-primary-300">
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row gap-5">
                        <Card />
                        <Card />
                    </View>
                </View>

                {/* <Text className='text-3xl my-10'>Welcome to Re-Estate</Text> */}
            </View>
        </SafeAreaView>
    );
}
