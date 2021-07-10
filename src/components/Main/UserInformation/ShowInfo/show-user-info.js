import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import ShowRoleUser from '../../../Common/show-role';
import {connect} from 'react-redux'
import { actionsType, app } from '../../../../globals/constants';
import { getInfo } from '../../../../core/Service/authentication';
import { setAllInfo } from '../../../../core/Actions/UserInforActions';
import { AuthenticationContext } from '../../../Context/authentication-context';

const ShowUserInfo = (props) => {
    const navigation = useNavigation()
    const { auth } = props
    const {info, setAllInfo} = props
    const { username, firstname, lastname, phone, email, roles } = info
    const { deleteToken }=props
    const {logout}=useContext(AuthenticationContext)
    useEffect(() => {
        getInfo(auth).then((data)=>{
            setAllInfo(data)
        }).catch((error)=>{
            Alert.alert("Lỗi",`${error.error.message}`)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            getInfo(auth).then((data)=>{
                setAllInfo(data)
            }).catch((error)=>{
                Alert.alert("Lỗi",`${error.error.message}`)
            })
        }, [])
    )

    const logOut = ()=>{
        Alert.alert("Lưu ý", "Bạn muốn đăng xuất khỏi tài khoản?",[
            {
                text:'Không',
                style: 'cancel'
            },
            {
                text:'Ok',
                style: 'destructive',
                onPress:()=>{
                    logout()
                }
            }
        ])
    }
    return (
        <View style={styles.container}>
            <View style={styles.showInfo}>
                <View style={styles.baseInfo}>
                    <View style={styles.titles}>
                        <Text>Tên đăng nhập: </Text>
                        <Text>Họ: </Text>
                        <Text>Tên: </Text>
                        <Text>Số điện thoại: </Text>
                        <Text>Email: </Text>
                    </View>
                    <View style={styles.info}>
                        <Text>{username}</Text>
                        <Text>{firstname}</Text>
                        <Text>{lastname}</Text>
                        <Text>{phone}</Text>
                        <Text>{email}</Text>
                    </View>
                </View>
                <View style={styles.role}>
                    <ShowRoleUser role={roles}></ShowRoleUser>
                </View>
            </View>
            <View style={styles.feature}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'white'}]}
                    onPress={()=>navigation.navigate(app.navigation.EditInformation)}
                >
                    <Text>Thay đổi thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor:'red'}]}
                    onPress={()=>logOut()}
                >
                    <Text>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    showInfo: {
        flex: 5,
        width: '100%',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderWidth: 2,
        alignItems: 'center'
    },
    feature: {
        flex: 5,
        width: '100%',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 20
    },
    titles:{
        alignItems: 'flex-end',
    },
    info: {
        marginLeft: 9,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    baseInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 27
    },
    role: {
        padding: 20,
        width:"90%"
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 12,
        width: '90%',
        margin: 12
    },
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        info: state.userInfo
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setAllInfo: (item)=>dispatch(setAllInfo(item))
    }
}

export default connect(mapStateToProps,mapFuncToProps)(ShowUserInfo)