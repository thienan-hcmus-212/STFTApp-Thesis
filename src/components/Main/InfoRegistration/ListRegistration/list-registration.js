import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { app } from '../../../../globals/constants'
import ItemListRegistration from '../ListItemRegistration/list-item-registration'
import {connect} from 'react-redux'
import { deleteItemList, fetchingRegistrationList } from '../../../../core/Actions/RegistrationAction'
import infoARegistration from '../InfoARegistration/info-a-registration'

const ListRegistration = (props) => {
    const { navigation } = props
    const [modalShowSelectAdd, setModalShowSelectAdd] = useState(false)

    const {registrationData, deleteItem} = props
    const {isLoadingFetchingList, fetchList} = props

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add-circle-outline"
                    size={40}
                    color="#fff"
                    onPress={() => setModalShowSelectAdd(true)} />
            ),
        });
    }, [navigation]);

    useEffect(()=>{
        fetchList()
    },[])

    const renderItem = ({ item }) => {
        return (
            <ItemListRegistration
                item={item}
                deleteItem={()=>deleteItem(item)}
                onPress={()=>navigation.navigate(app.navigation.InfoRegistrationItemInfo,{editable:false,item:item})}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalShowSelectAdd}
                onRequestClose={() => {
                    setModalShowSelectAdd(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBlue]}
                            onPress={() => setModalShowSelectAdd(false)}
                        >
                            <Text style={styles.textStyle}>Add to registration list</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonRed]}
                            onPress={() => setModalShowSelectAdd(false)}
                        >
                            <Text style={styles.textStyle}>Add emergency situation</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {isLoadingFetchingList?
                <View style={styles.centeredView}>
                    <ActivityIndicator size={90} color="blue" />
                </View>
            :
            <FlatList
                style={{flex:1}}
                data={registrationData}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />}     
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        padding: 10,
        elevation: 2,
        width: '100%',
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonRed: {
        //backgroundColor: '#F40'
    },
    buttonBlue: {
        //backgroundColor: '#09F'
    },
    
})

const mapStateToProps = (state) =>{
    return {
        registrationData: state.registration.registrationList,
        isLoadingFetchingList: state.registration.isLoadingFetchingList,
    }
}

const mapFuncToProps = (dispatch) =>{
    return {
        deleteItem: (item) => dispatch(deleteItemList(item)),
        fetchList: ()=>dispatch(fetchingRegistrationList())
    }
}

export default connect(mapStateToProps,mapFuncToProps)(ListRegistration)