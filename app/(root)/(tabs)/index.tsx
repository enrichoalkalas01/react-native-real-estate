import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    Button,
    ActivityIndicator,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getListProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResult from "@/components/NoResult";

export default function HomeScreen() {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{
        query?: string;
        filter?: string;
    }>()

    const { data: latestPropertiesData, loading: latestPropertiesLoading } = useAppwrite({
        fn: getLatestProperties
    })

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getListProperties,
        params: {
            filter: `${params.filter || ""}`,
            query: `${params.query || ""}`,
            limit: 4
        },
        skip: true,
    })

    const handlePress = (id: string) => {
        return router.push(`/properties/${id}`)
    }

    useEffect(() => {
        refetch({
            filter: `${params.filter || ""}`,
            query: `${params.query || ""}`,
            limit: 4
        })
    }, [params.filter, params.query])

    return (
        <SafeAreaView className="bg-white h-full">
            {/* <Button title="Seed" onPress={seed} /> */}
            <FlatList
                // data={[]}
                // data={[1, 2, 3, 4, 5]}
                data={properties || []}
                renderItem={({ item }) => {
                    return <Card item={item} onPress={() => handlePress(item.$id)} />;
                }}
                keyExtractor={(item) => {
                    return item?.$id.toString() || "";
                }}
                numColumns={2}
                key={`flatlist-${2}`}
                ListEmptyComponent={
                    loading ? <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                    : <NoResult />
                }
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View className="px-5">
                        {/* Profile */}
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row items-center gap-2">
                                <TouchableOpacity>
                                    <Image
                                        source={{ uri: user?.avatar }}
                                        className="size-12 rounded-full"
                                    />
                                </TouchableOpacity>
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-xs font-rubik text-black-100">
                                        Good Morning
                                    </Text>
                                    <Text className="text-base font-rubik-medium text-black-300">
                                        {user?.name}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    source={icons.bell}
                                    className="size-6 mr-2"
                                />
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
                                {
                                    latestPropertiesLoading ?
                                        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                                    : !latestPropertiesData || latestPropertiesData?.length === 0 ? <NoResult /> : (
                                        <FlatList
                                            // data={[]}
                                            // data={[1, 2, 3, 4]}
                                            data={latestPropertiesData || []}
                                            renderItem={({ item }) => {
                                                return <FeaturedCards item={item} onPress={() => handlePress(item.$id)} />;
                                            }}
                                            keyExtractor={(item) => item.$id.toString()}
                                            horizontal
                                            // bounces
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerClassName="flex gap-5"
                                        />
                                    )
                                }
                                
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
                            <Filters />
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
