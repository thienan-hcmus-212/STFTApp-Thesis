import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { app } from '../../../../../globals/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'

const description = (order )=>{
    switch (order) {
        case 0:
            return "Trường hợp khẩn cấp, có người bệnh"
        case 1:
            return "Trường hợp có nhiều trẻ em"
        case 2:
            return "Trường hợp có nhiều người già và phụ nữ"
        case 3:
            return "Trường hợp gặp nạn thông thường"
    }
    return "Chưa xác thực"
}

const MarkerForItemList = (item,onPressMarker,addRef) => {
    const defaultMarker = (color,addRef) => (
            <Marker
                title={item.name}
                description={description(item.order)}
                key={item.id}
                coordinate={{ longitude: item.longitude, latitude: item.latitude }}
                pinColor={color}
                onPress={()=>onPressMarker(item)}
                ref={addRef}
            />
        )
    const unAuthenticaMarker = (color,backgroundColor,addRef) => (
        <Marker
            key={item.id}
            coordinate={{ longitude: item.longitude, latitude: item.latitude }}
            title={item.name}
            description={description(item.eState)}
            onPress={()=>onPressMarker(item)}
            ref={addRef}
        >
            <View style={{backgroundColor: backgroundColor, borderRadius: 100}}>
                <Ionicons
                    name='help-circle'
                    color={color}
                    size={36}
                    style={{ borderRadius: 100 }}
                ></Ionicons>
            </View>
        </Marker>
    )
    switch (item.order) {
        case 0:
            return defaultMarker('#FF0000',addRef)
        case 1:
            return defaultMarker('#FF4200',addRef)
        case 2:
            return defaultMarker('#FF9E00',addRef)
        case 3:
            return defaultMarker('#FFDC00',addRef)
    }
    return defaultMarker('red',addRef)

}

export { MarkerForItemList }