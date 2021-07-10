import React from 'react'
import { View, StyleSheet, Text, Image, Pressable, Alert ,TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {getNameLocation} from '../../../../core/Service/location'
const sizeIcon = 22
const ItemListRegistration = (props) => {
    const item = props.item
    const { onPress } = props
    const location = getNameLocation(item.ward?.id)
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? '#C8C8C8' : 'white' }, styles.container]}
            onPress={()=> onPress()}
        >
            <View style={styles.container_info}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <View style={styles.container_line}>
                    <Ionicons
                        name="person"
                        size={sizeIcon}
                        style={styles.icons}
                    />
                    <Text>{item.name}</Text>
                </View>
                <View style={styles.container_line}>
                    <Ionicons
                        name="call"
                        size={sizeIcon}
                        style={styles.icons}
                    />
                    <Text>{item.phone}</Text>
                </View>
                <View style={styles.container_line}>
                    <Ionicons
                        name="people"
                        size={sizeIcon}
                        style={styles.icons}
                    />
                    <Text>{item.numPerson + " person"}</Text>
                </View>
            </View>
            <View style={styles.container_line}>
                <Ionicons
                    name="location"
                    size={sizeIcon}
                    style={styles.icons}
                />
                <Text>{location.xa + ", " + location.huyen+ ", " + location.tinh}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 9,
        marginVertical: 9,
        padding: 12,
        borderWidth: 2,
        width: '93%',
        alignSelf: 'center',
    },
    container_info: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        maxHeight: 120,
        marginBottom: 12
    },
    container_line: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        flexDirection: 'row'
    },
    image: {
        height: 120,
        width: 120,
        marginRight: 40
    },
    icons: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 20
    }
})

export default ItemListRegistration