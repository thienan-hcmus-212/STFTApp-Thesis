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
                    <Image
                        source={require('../../../../../assets/avatar-none.png')}
                        style={[styles.image, { margin: 0 }]}
                    />
                    <View style={styles.info}>
                        <Text>Tên đăng nhâp: {username}</Text>
                        <Text>Họ: {firstname}</Text>
                        <Text>Tên: {lastname}</Text>
                        <Text>Số điện thoại: {phone}</Text>
                        <Text>Email: {email}</Text>
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
        flex: 4,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 36,
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderWidth: 2
    },
    feature: {
        flex: 6,
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
    info: {
        backgroundColor: 'white',
        marginLeft: 12,
        justifyContent: 'flex-start',
        padding: 20,
        borderRadius: 20,
    },
    baseInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    role: {
        padding: 20,
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