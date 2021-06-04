import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { app } from '../../../../../globals/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'

const description = (state)=>{
    switch (state) {
        case app.state_victim.unAuthentica:
            return "Chưa xác thực"
        case app.state_victim.emergency:
            return "Nguy hiểm, đã xác thực"
        case app.state_victim.safe:
            return "An toàn"
        case app.state_victim.danger:
            return "Nguy hiểm, chưa xác thực"
    }
    return "Chưa xác thực"
}

const MarkerForItemList = (item,onPressMarker,addRef) => {
    const defaultMarker = (color,addRef) => (
            <Marker
                title={item.name}
                description={description(item.eState)}
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
    switch (item.eState) {
        case app.state_victim.unAuthentica:
            return unAuthenticaMarker('white','black',addRef)
        case app.state_victim.emergency:
            return defaultMarker('red',addRef)
        case app.state_victim.safe:
            return defaultMarker('green',addRef)
        case app.state_victim.danger:
            return unAuthenticaMarker('white','red',addRef)
    }
    return defaultMarker('red',addRef)

}

export { MarkerForItemList }