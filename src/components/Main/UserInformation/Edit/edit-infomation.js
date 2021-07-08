import React, { useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { setUnit } from '../../../../core/Actions/UserInforActions'
import { actionsType, regexTypes } from '../../../../globals/constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { changeUserInfo } from '../../../../core/Service/authentication'
import { useNavigation } from '@react-navigation/native'

const EditInformation = (props) => {

    const navigation= useNavigation()
    const { info, auth } = props
    const { username, lastname, firstname, phone, email } = info
    const { setEmail, setPhone, setFirstname, setLastname } = props

    const refInput = useRef([])
    const checkValue =(info)=>{
        let error={
            ok:true,
            errorname:[]
        };
        regexTypes.name.regex.test(info.lastname)?null:
            error={
                ok:false,
                errorname: [...error.errorname,regexTypes.name.messageErr]
            }
        regexTypes.name.regex.test(info.firstname)?null:
            error={
                ok:false,
                errorname: [...error.errorname,regexTypes.name.messageErr]
            }
        regexTypes.phone.regex.test(info.phone)?null:
            error={
                ok:false,
                errorname: [...error.errorname,regexTypes.phone.messageErr]
            }
        regexTypes.email.regex.test(info.email)?null:
            error={
                ok:false,
                errorname: [...error.errorname,regexTypes.email.messageErr]
            }
        return error
    }
    const submitChangeInfo = (info)=>{
        Alert.alert("Lưu ý","Bạn muốn thay đổi thông tin cá nhân",[
            {
                text:'Hủy',
                style:'cancel'
            },
            {
                text:'Ok',
                onPress:()=>{
                    const error = checkValue(info)
                    if (error.ok){
                        changeUserInfo(auth,info).then((response)=>{
                            navigation.goBack()
                        }).catch((error)=>{
                            Alert.alert("Lỗi",`${error.message}`)
                        })
                    } else {
                        let string='';
                        error.errorname.map((i)=>{
                            string+=`${i}.\n`
                        })
                        Alert.alert('Lỗi',`${string}`)
                    }
                    
                },
                style:'destructive'
            }
        ])
    }
    const onSubmitEditing=(i)=>{
        refInput.current[i].blur();
        //refInput.current[i+1].focus()
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.containerTextField, { marginTop: 40 }]}>
                    <Icon
                        name="shield-account"
                        size={40}
                        style={{ flex: 2 }}
                    ></Icon>
                    <View style={styles.containerText}>
                        <OutlinedTextField
                            label="Tên đăng nhập"
                            value={username}
                            editable={false}
                            disabled={true}
                        />
                    </View>
                </View>

                <View style={[styles.containerTextField]}>
                    <Icon
                        name="account-outline"
                        size={40}
                        style={{ flex: 2 }}
                    ></Icon>
                    <View style={styles.containerText}>
                        <OutlinedTextField
                            label="Họ"
                            value={lastname}
                            onChangeText={(t) => setLastname(t)}
                            ref={(el)=>refInput.current[0]=el}
                            onSubmitEditing={()=>onSubmitEditing(0)}
                        />
                    </View>
                </View>

                <View style={[styles.containerTextField]}>
                    <Icon
                        name="account"
                        size={40}
                        style={{ flex: 2 }}
                    ></Icon>
                    <View style={styles.containerText}>
                        <OutlinedTextField
                            label="Tên"
                            value={firstname}
                            onChangeText={(t) => setFirstname(t)}
                            ref={(el)=>refInput.current[1]=el}
                            onSubmitEditing={()=>onSubmitEditing(1)}
                        />
                    </View>
                </View>
                <View style={[styles.containerTextField]}>
                    <Icon
                        name="phone"
                        size={40}
                        style={{ flex: 2 }}
                    ></Icon>
                    <View style={styles.containerText}>
                        <OutlinedTextField
                            label="Số điện thoại"
                            value={phone}
                            onChangeText={(t) => setPhone(t)}
                            keyboardType='phone-pad'
                            ref={(el)=>refInput.current[2]=el}
                            onSubmitEditing={()=>onSubmitEditing(2)}
                        />
                    </View>
                </View>
                <View style={[styles.containerTextField]}>
                    <Icon
                        name="email"
                        size={40}
                        style={{ flex: 2 }}
                    ></Icon>
                    <View style={styles.containerText}>
                        <OutlinedTextField
                            label="Email"
                            value={email}
                            onChangeText={(t) => setEmail(t)}
                            ref={(el)=>refInput.current[3]=el}
                            onSubmitEditing={()=>onSubmitEditing(3)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>submitChangeInfo(info)}
                >
                    <Text>Thay đổi</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerTextField: {
        margin: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerText: {
        flex: 8
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 12,
        width: '90%',
        margin: 12,
        backgroundColor: 'red',
        alignSelf:'center'
    }
})

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        info: state.userInfo
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        setFirstname: (name) => dispatch(setUnit(name, actionsType.userinfo.setFirstName)),
        setLastname: (name) => dispatch(setUnit(name, actionsType.userinfo.setLastName)),
        setPhone: (number) => dispatch(setUnit(number, actionsType.userinfo.setPhone)),
        setEmail: (email) => dispatch(setUnit(email, actionsType.userinfo.setEmail))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(EditInformation)