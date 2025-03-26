import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data'

export default function Filters() {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All')
    console.log(params)

    const handleCategory = (category: string) => {
        if ( selectedCategory === category ) {
            setSelectedCategory("All")
            router.setParams({ filter: 'All' })
            return
        }

        setSelectedCategory(category)
        router.setParams({ filter: category })
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='mt-3 mb-2'
        >
            {categories?.map((item, index) => {
                return(
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleCategory(item.title)}
                        className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
                    >
                        <Text className={`text-sm ${selectedCategory === item.category ? "text-white font-rubik-bold" : "text-black-300 font-rubik" }`}>{item?.title}</Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}