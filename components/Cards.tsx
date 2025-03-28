import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface IProps {
    item?: any;
    onPress?: () => void;
}

export function FeaturedCards({ item, onPress }: IProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-col items-start w-60 h-80 relative"
        >
            <Image
                // source={images.japan}
                source={{ uri: item.image }}
                className="size-full rounded-2xl shadow-md"
            />

            <Image
                source={images.cardGradient}
                className="size-full rounded-2xl absolute bottom-0"
            />

            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
                    {/* 4.4 */}
                    {item.rating}
                </Text>
            </View>

            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                <Text
                    className="text-xl font-rubik-extrabold text-white"
                    numberOfLines={1}
                >
                    {/* Modern Apartment */}
                    {item.name}
                </Text>
                <Text className="text-sm mt-1 font-rubik text-white">
                    {/* 22 W 15th St, New York */}
                    {item.address}
                </Text>

                <View className="flex flex-row items-center justify-between w-full mt-2">
                    <Text className="text-white text-xl font-rubik-extrabold font-bold">
                        {/* $2,500 */}
                        ${item.price}
                    </Text>
                    <Image source={icons.heart} className="size-5" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function Card({ item, onPress }: IProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-1 w-full mt-5 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
        >
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
                    {item.rating}
                </Text>
            </View>

            <Image
                // source={images.newYork}
                source={{ uri: item.image }}
                className="w-full h-40 rounded-lg"
            />

            <View className="flex flex-col mt-2">
                <Text className="text-base font-rubik-bold text-black-300">
                    {/* Cozy Studio */}
                    {item.name}
                </Text>
                <Text className="text-sm mt-1 font-rubik text-black-200">
                    {/* 22 W 15th St, New York */}
                    {item.address}
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-primary-300 text-xl font-rubik-bold font-bold">
                        {/* $2,500 */}
                        ${item.price}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="w-5 h-5 mr-2"
                        tintColor={"#191D31"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
