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

export default function Explore() {
    const params = useLocalSearchParams<{
        query?: string;
        filter?: string;
    }>()

    const { data: properties, loading, refetch } = useAppwrite({
        fn: getListProperties,
        params: {
            filter: `${params.filter || ""}`,
            query: `${params.query || ""}`,
            limit: 20
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
            limit: 20
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
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => { router.back() }} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-5" />
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300 ">Search for Your Ideal Home</Text>
                            <TouchableOpacity className="mr-2">
                                <Image source={icons.bell} className="w-6 h-6" />
                            </TouchableOpacity>
                        </View>

                        <Search />

                        <View className="mt-5">
                            <Filters />
                            <Text className="text-xl font-rubik-bold text-black-300 mt-5">Found { properties?.length } Properties</Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}