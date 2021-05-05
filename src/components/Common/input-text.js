import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'


function areEqual(prevProps,nextProps) {

    return prevProps.val===nextProps.val?true:false
}

const InputText = React.memo(React.forwardRef( (props,ref)=> {
    const { name, style , val, phone } = props
    const { password, autoFocus } = props
    const { onChangeText, onSubmit , addToRef} = props
    //console.log('input text render '+name)
    return (
        <View style={{...styles.container,...style}}>
            { val && val != '' ? <Text style={styles.text}>{name}</Text> : <View/>} 
            <TextInput
                placeholder={name}
                value={val}
                onChangeText={(t) => onChangeText(t)}
                ref={addToRef?addToRef:ref}
                onSubmitEditing={onSubmit}
                blurOnSubmit={false}

                autoFocus={Boolean(autoFocus)}
                secureTextEntry={Boolean(password)}

                multiline={false}
                underlineColorAndroid='blue'
                style={styles.textInput}

                keyboardType={phone?'phone-pad':'ascii-capable'}
            />
        </View>
    )
}),areEqual)

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "90%"
    },
    text: {
        width: '100%',
        fontSize: 12,
        color: 'blue'
    },
    textInput: {
        width: '100%',
        margin: 0,
        paddingBottom: 9,
        paddingLeft: 4
    },
    textErr: {
        fontSize: 12,
        color: 'red'
    }
})
export default InputText