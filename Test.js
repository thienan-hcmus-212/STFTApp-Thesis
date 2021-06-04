import React, {useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

export default Test = () => {
  const actionSheetRef = useRef();
  const scrollViewRef = useRef();
  const actionSheetScrollRef = actionSheetRef.current?.scrollViewRef;

  function changeScrollEnabled(parent, child) {
    // We only need this on Android, iOS works great with Child Scroll Views.
    if (Platform.OS !== 'android') return;
    actionSheetScrollRef?.current?.setNativeProps({
      scrollEnabled: parent,
    });
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: child,
      nestedScrollEnabled: true,
    });
  }

  const onScroll = (event) => {
    changeScrollEnabled(true, true);
  };

  const onHasReachedTop = (hasReachedTop) => {
    changeScrollEnabled(!hasReachedTop, hasReachedTop);
  };

  const onClose = () => {
    console.log(actionSheetRef.current)
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: false,
    });
  };

  const onOpen = () => {
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: true,
    });
  };
  const header = ()=>{
    return (<View style={{height:200,backgroundColor: 'red'}}></View>)
  }
  return (
    <>
      <SafeAreaView style={styles.safeareview}>
        <TouchableOpacity
          onPress={() => {
            console.log("press")
            actionSheetRef.current?.show();
          }}
          style={styles.btn}>
          <Text style={styles.btnTitle}>Open ActionSheet</Text>
        </TouchableOpacity>
          
        <ActionSheet
          //initialOffsetFromBottom={0.3}
          ref={actionSheetRef}
          onOpen={onOpen}
          //statusBarTranslucent
          onPositionChanged={onHasReachedTop}
          // bounceOnOpen={true}
          // bounciness={4}
          gestureEnabled={true}
          onClose={onClose}
          defaultOverlayOpacity={0}
          // bottomOffset={200}
          // closable={false}
          springOffset={200}
          CustomHeaderComponent={header()}
          // headerAlwaysVisible={true}
          >
          <View
            style={{
              paddingHorizontal: 12,
            }}>
            <View style={styles.container}>
              {['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71'].map(
                (color) => (
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}
                    key={color}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: color,
                    }}
                  />
                ),
              )}
            </View>

            <ScrollView
              ref={scrollViewRef}
              //nestedScrollEnabled={false} 
              onScroll={onScroll}
              onStartShouldSetResponder={() => {
                changeScrollEnabled(false, true);
                return false;
              }}
              onScrollEndDrag={() => {
               // changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              onTouchEnd={() => {
                //changeScrollEnabled(true, false);
              }}
              onScrollAnimationEnd={() => {
                //changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              onMomentumScrollEnd={() => {
                //changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              scrollEventThrottle={2}
              style={styles.scrollview}>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Write your text here"
              />

              <View>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}
                    style={styles.listItem}>
                    <View
                      style={{
                        width: item,
                        height: 15,
                        backgroundColor: '#f0f0f0',
                        marginVertical: 15,
                        borderRadius: 5,
                      }}
                    />

                    <View style={styles.btnLeft} />
                  </TouchableOpacity>
                ))}
              </View>

              {/*  Add a Small Footer at Bottom */}
              <View style={styles.footer} />
            </ScrollView>
          </View>
        </ActionSheet>
      </SafeAreaView>
    </>
  );
};

const items = [
  100,
  60,
  150,
  200,
  170,
  80,
  41,
  101,
  61,
  151,
  202,
  172,
  82,
  43,
  103,
  64,
  155,
  205,
  176,
  86,
  46,
  106,
  66,
  152,
  203,
  173,
  81,
  42,
];

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollview: {
    width: '100%',
    padding: 12,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe8a71',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0.3 * 4, height: 0.5 * 4},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  safeareview: {
    flex: 1,
        position: 'absolute',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
