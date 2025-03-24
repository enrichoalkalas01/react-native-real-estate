// Library
import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Constant
import images from '@/constants/images'

export default function SignIn() {
    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain' />
                <View className='px-10'>
                    <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to Re-Estate</Text>
                    <Text className=''>Let's get your closer to </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}