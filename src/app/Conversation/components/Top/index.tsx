import React, {useEffect, memo, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import ButtonGradient from "./../../../../elements/ButtonGradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setSize } from '../../../../helpers/responsive/Index';
import { colorsSocial } from '../../../../assets/general';
import {images} from '../../../../assets/general/index';
import { getFileByPath } from '../../../../helpers/files';
import If from '../../../../elements/If';
import * as Animatable from "react-native-animatable";
import MessageTypeAction from '../../../../elements/MessageTypeAction';
import { IConversationTopProps } from './types';

const ConversationTop: React.FC<IConversationTopProps> = (props): JSX.Element => {

  // verify if avatar change and set new value
  useEffect(() => {
    setAvatar(
      props?.avatar !== 'null' && !!props?.avatar
        ? {uri: getFileByPath(props?.avatar)}
        : images.avatars[0],
    );
  }, [props?.avatar]);

  const [avatar, setAvatar] = useState(
    props?.avatar !== 'null' && !!props?.avatar
      ? {uri: getFileByPath(props?.avatar)}
      : images.avatars[0],
  );

  const onErrorAvatar = useCallback((error: any): void => {
    if (error) setAvatar(images.avatars[0]);
  }, []);

  return (
      <View style={styles.containerTop}>

        {/* container top left, criar um componente */}
        <View style={styles.left}>
          <ButtonGradient
            style={styles.buttonGoBack}
            colors={["transparent", "transparent"]}
            locationLinearGradient={[0.0, 1]}
            iconRight={
              <Ionicons 
                name={"md-arrow-back"}
                size={setSize(20)}
                color={colorsSocial.colorA1}
              />
            }
            animationInitial={"slideInLeft"}
            animationClick={"pulse"}
            onPress={props.goBack}
          />
        </View>

        {/* container top center, criar um componente */}
        <View style={styles.center}>
          <View style={styles.viewAvatar}>
            <Image  
              style={styles.avatar}
              imageStyle={styles.avatarContainer}
              source={avatar}
              onError={onErrorAvatar}
            />
            <View style={styles.viewOnline(props?.online, colorsSocial.colorA1)} />
          </View>
          <View>
            <Text numberOfLines={1} style={styles.fullName}>
              {props?.fullName || "---"}
            </Text>
            <MessageTypeAction 
              actionChat={props?.actionChat}
              colorText={colorsSocial.colorA1}
            />
          </View>
        </View>

        {/* container top right, criar um componente */}
        <View style={styles.right}>
          <If condition={props.messagesSelected?.length > 0}>
            <Animatable.View 
              style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}} 
              animation={"bounceIn"}>
              <TouchableOpacity
                style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}} 
                onPress={() => props?.showModal("REMOVE_MESSAGES")}>
                <Text style={styles.textValueActions}
                  numberOfLines={1}>
                  {props?.messagesSelected?.length}
                </Text>
                <Ionicons 
                  name={"trash-sharp"}
                  size={setSize(20)}
                  color={colorsSocial.colorA1}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: setSize(10)}} 
                onPress={() => props?.cancelMessagesSelected()}>
                <Ionicons 
                  name={"close"}
                  size={setSize(20)}
                  color={colorsSocial.colorA1}
                />
              </TouchableOpacity>
            </Animatable.View>
          </If>
        </View>
        
      </View>
  );
};

export default memo(ConversationTop);
