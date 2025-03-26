import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();

    const [search, setSearch] = useState(params.query);

    const debounce = useDebouncedCallback((text: string) =>
        router.setParams({ query: text })
    );

    const handleSearch = (text: string) => {
        setSearch(text);
        debounce(text);
    };

    console.log(search);

    return (
        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                <Image source={icons.search} className="size-5" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search for anything"
                    className="text-sm font-rubik text-black-300 ml-2 flex-1"
                />
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className="size-5" />
                {/* <Text>Search</Text> */}
            </TouchableOpacity>
        </View>
    );
}
