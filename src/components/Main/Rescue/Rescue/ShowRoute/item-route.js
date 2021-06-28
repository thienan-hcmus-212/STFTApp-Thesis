import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ItemRoute = (props) => {
    const { item, index, focusItem, deleteItem , done } = props
    return (
        <View style={styles.container}>
            <Text style={styles.index}>{index + 1}</Text>
            <TouchableOpacity
                onPress={() => focusItem && focusItem()}
                style={item.later?{...styles.title,backgroundColor:'green'}:styles.title}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
            {index >= 0 &&
                <TouchableOpacity
                    onPress={() => deleteItem()}
                >
                    <Icon
                        name='close-circle'
                        size={27}
                        color='black'
                    ></Icon>
                </TouchableOpacity>}
            {index == 0 && item.later == true &&
                <TouchableOpacity
                    onPress={() => done()}
                >
                    <Icon
                        name='checkmark-done-circle'
                        size={27}
                        color='green'
                    ></Icon>
                </TouchableOpacity>
            }
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
        marginRight: 9,
    }
})

export default ItemRoute