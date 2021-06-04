import React, { useCallback, useRef } from 'react'
import { View, StyleSheet, Image, Alert, TouchableOpacity , Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActionSheet from "react-native-actions-sheet";
import {servicePickImage,serviceTakePicture} from '../../core/Service/picture'

const AvatarPicker = (props) => {

    const { editable, image, setImage } = props
    const actionSheetRef = useRef()

    const pickImage = () => {
        servicePickImage().then((uri)=>{
            setImage(uri)
        }).catch((e)=>{
            e && alert(e)
        })
        actionSheetRef.current?.setModalVisible(false)
    }

    const takePicture = () => {
        serviceTakePicture().then((uri)=>{
            setImage(uri)
        }).catch((e)=>{
            e && alert(e)
        })
        actionSheetRef.current?.setModalVisible(false)
    }

    return (
        <>
            <View style={styles.container}>
                {image ?
                    <Image
                        source={{
                            uri: image
                        }}
                        style={[styles.image, { margin: 0 }]}
                    /> :
                    <Image
                        source={require('../../../assets/avatar-none.png')}
                        style={[styles.image, { margin: 0 }]}
                    />}
                {editable ?
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={(e) => {
                            return actionSheetRef.current?.setModalVisible(true)
                        }}
                    >
                        <Ionicons
                            name="camera"
                            size={36}
                            style={{ alignSelf: 'center' }}
                        />

                    </TouchableOpacity>
                    : null}

            </View>

            <ActionSheet ref={actionSheetRef}>
                <Ionicons
                    name="remove"
                    size={40}
                    style={{ alignSelf: 'center' }}
                ></Ionicons>
                <View style={styles.container_actionSheet}>
                    <TouchableOpacity
                        style={styles.option_picker}
                        onPress={()=>pickImage()}
                    >
                        <Ionicons
                            name='images-outline'
                            size={30}
                        ></Ionicons>
                        <Text style={styles.text_option}>Chọn Ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.option_picker}
                        onPress={()=>takePicture()}
                    >
                        <Ionicons
                            name='camera-outline'
                            size={30}
                        ></Ionicons>
                        <Text style={styles.text_option}>Chụp Ảnh</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 120,
        margin: 12,
        justifyContent: 'flex-end'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 100,
    },
    icon: {
        backgroundColor: 'white',
        borderRadius: 100,
        position: 'absolute',
        alignSelf: 'flex-end',
        height: 45,
        width: 45
    },
    container_actionSheet: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 20
    },
    option_picker:{
        flexDirection:'row',
        justifyContent: 'center',
        margin: 12,
        alignItems: 'center'
    },
    text_option:{
        marginLeft: 20
    }
})

export default AvatarPicker