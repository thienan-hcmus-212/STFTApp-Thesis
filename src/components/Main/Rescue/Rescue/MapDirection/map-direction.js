import React, { useEffect, useState } from 'react'
import { Polyline } from 'react-native-maps';
import { getDirectionTwoPoint } from '../../../../../core/Service/map-direction';

const MapDirection = (props) => {
    const { start, end } = props
    const [directionList, setDirectionList] = useState([])
    console.log(end)
    useEffect(() => {
        getDirectionTwoPoint(start, end).then((array) => {
            console.log(array)
            setDirectionList(array)
        }).catch((error) => {

        })
    }, [])
    return (
        <>
            { end ?
                directionList.length > 0 &&
                <Polyline
                    coordinates={directionList.map((item) => {
                        return {
                            longitude: item[0],
                            latitude: item[1]
                        }
                    })}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={7}
                ></Polyline>
                : null}
        </>
    )
}

export default MapDirection