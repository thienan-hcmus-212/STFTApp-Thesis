import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar,Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { actionsType, stylesMain } from '../../../../globals/constants'
import InputText from '../../../Common/input-text'
import LogoApp from '../../../Common/logo-app'
import { changeRoleUser, onChangeText, onPressRegister } from '../../../../core/Actions/RegisterAction'
import SelectRoleUser from '../../../Common/select-role-user'

const RegisterContainer = (props) => {

    const { username, password, firstname, lastname, phone, email, passwordConfirm, role } = props.data
    const { changeRoleUser ,onChangeUsername, onChangePassword, onChangeEmail, onChangeFirstname, onChangeLastname, onChangePhone, onChangeConfirmPassword, onPressRegister } = props
    const inputRef = useRef([])

    const focusNextInput = (i) => {
        return inputRef.current[i + 1] ? inputRef.current[i + 1].focus() : onPressOk()
    };

    const onPressOk = ()=>{
        onPressRegister();
    }
    const addToRef = (el) => {
        const length = inputRef.current.length
        return el ? (inputRef.current.includes(el) ? null : inputRef.current[length] = el) : null
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={{ height: 200, justifyContent: 'center' }}>
                <LogoApp size={120} textSize={24} />
            </View>

            <SelectRoleUser
                changeRoleUser={changeRoleUser}
                role={role}
            />
            
            <InputText
                style={styles.inputText}
                name="Tên Đăng nhập"

                val={username}
                onChangeText={onChangeUsername}

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(0)}
            />

            <InputText
                style={styles.inputText}
                name="Họ"

                val={lastname}
                onChangeText={onChangeLastname}

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(1)}
            />

            <InputText
                style={styles.inputText}
                name="Tên"

                val={firstname}
                onChangeText={onChangeFirstname}

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(2)}
            />
            

            <InputText
                style={styles.inputText}
                name="Số điện thoại"

                val={phone}
                onChangeText={onChangePhone}
                phone={true}

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(3)}
            />

            <InputText
                style={styles.inputText}
                name="Email"

                val={email}
                onChangeText={onChangeEmail}

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(4)}
            />

            <InputText
                style={styles.inputText}
                name="Mật khẩu"

                val={password}
                onChangeText={onChangePassword}
                password='true'

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(5)}
            />

            <InputText
                style={styles.inputText}
                name="Nhập lại mật khẩu"

                val={passwordConfirm}
                onChangeText={onChangeConfirmPassword}
                password='true'

                ref={inputRef}
                addToRef={addToRef}
                onSubmit={()=>focusNextInput(6)}
            />

            <TouchableOpacity
                style={{ ...stylesMain.button, backgroundColor: 'aqua', marginTop: 12 }}
                onPress={() => onPressOk()}
            >
                <Text>Đăng kí</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 12 }}></View>
        </ScrollView>



    )
}


const styles = StyleSheet.create({
    inputText: {
        margin: 4,
    },
    scrollContainer: {

    },
})

const mapStateToProps = (state) => {
    return {
        data: state.register
    }
}

const mapFuncToProps = (dispatch) => {
    return {
        onChangeUsername: (t) => dispatch(onChangeText(t, actionsType.register.onChangeUsername)),
        onChangePassword: (t) => dispatch(onChangeText(t, actionsType.register.onChangePassword)),
        onChangeFirstname: (t) => dispatch(onChangeText(t, actionsType.register.onChangeFirstname)),
        onChangeLastname: (t) => dispatch(onChangeText(t, actionsType.register.onChangeLastname)),
        onChangePhone: (t) => dispatch(onChangeText(t, actionsType.register.onChangePhone)),
        onChangeEmail: (t) => dispatch(onChangeText(t, actionsType.register.onChangeEmail)),
        onChangeConfirmPassword: (t) => dispatch(onChangeText(t, actionsType.register.onChangeConfirmPassword)),
        onPressRegister: () => dispatch(onPressRegister()),
        changeRoleUser: (isC,role) => dispatch(changeRoleUser(isC,role))
    }
}

export default connect(mapStateToProps, mapFuncToProps)(RegisterContainer)
