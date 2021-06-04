import React from 'react'
import {StyleSheet, Modal, View, ActivityIndicator } from 'react-native'


const ModalLoading = (props) =>{
    const { isModalLoading }=props
    return (
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalLoading}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator
                            size={90}
                            color="blue"
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles=StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        //backgroundColor: "white",
        borderRadius: 100,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1000,
    },
})

export default ModalLoading