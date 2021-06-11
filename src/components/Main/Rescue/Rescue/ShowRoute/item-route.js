import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ItemRoute = (props) => {
    const { item, index, focusItem, deleteItem } = props
    return (
        <View style={styles.container}>
            <Text style={styles.index}>{index + 1}</Text>
            <TouchableOpacity
                onPress={() => focusItem && focusItem()}
                style={styles.title}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
            {index >= 0 &&
                <TouchableOpacity
                    onPress={() => deleteItem()}
                >
                    <Icon
                        name='close'
                        size={36}
                        color='black'
                    ></Icon>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: 3,
        alignItems: 'center'
    },
    title: {
        borderWidth: 2,
        padding: 4,
        borderRadius: 12,
        width: '70%',
        paddingLeft: 12
    },
    index: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 12,
    }
})

export default ItemRoute