import * as ImagePicker from 'expo-image-picker'

const error = {
    rejectPermisstion: 'Sorry, we need camera roll permissions to make this work!',
    cameraWrong: "Sorry, Camera has something wrong",
    imageLibraryWrong: "Sorry, ImageLibrary has something wrong"
}

const serviceTakePicture = () => new Promise((reslove,reject)=>{
    const request = new Promise((res, rej) => {
        ImagePicker.requestCameraPermissionsAsync()
        .then((status) => {
            (status.status !== 'granted') ? rej(error.rejectPermisstion) : res()
        })
        .catch((e) => rej(e))
    })

    request.then(()=>{
        ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then((result)=>{
            (!result.cancelled) ?
                reslove(result.uri)
                : reject()

        }).catch(()=>{
            reject(error.cameraWrong)
        })

    }).catch((e)=>{
        reject(e)
    })
})

const servicePickImage =()=> new Promise((reslove,reject)=>{
    const request = new Promise((res, rej) => {
        ImagePicker.requestMediaLibraryPermissionsAsync()
        .then((status) => {
            (status.status !== 'granted') ? rej(error.rejectPermisstion) : res()
        })
        .catch((e) => rej(e))
    })
    
    request.then(()=>{
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then((result)=>{
            (!result.cancelled) ?
                reslove(result.uri)
                : reject()

        }).catch(()=>{
            reject(error.imageLibraryWrong)
        })

    }).catch((e)=>{
        reject(e)
    })
})

export { servicePickImage, serviceTakePicture }