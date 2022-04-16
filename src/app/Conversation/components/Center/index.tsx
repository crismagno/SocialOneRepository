import React, {memo, useRef} from 'react';
import {
  View,
  Animated,
} from 'react-native';
import styles from './styles';
import {RenderItem} from '../../../../types';
import Message from './components/Message';
import NoneData from './../../../../components/NoneData';
import If from '../../../../elements/If';
import {colorsSocial} from '../../../../assets/general';
import ButtonGradient from '../../../../elements/ButtonGradient';
import { IConversationCenterProps } from './types';
import { IMessageProps } from './components/Message/types';
import { handleScrollEvent } from '../../../../helpers/scroll';

const ConversationCenter: React.FC<IConversationCenterProps> = (
  props,
): JSX.Element => {

  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
  const flatListMessagesRef: React.MutableRefObject<null> = useRef(null);

  const renderItem = ({
    item,
    index,
  }: RenderItem<IMessageProps>): JSX.Element => {
    return <Message 
      {...item} 
      setMessageId={props?.setMessageId}
      messagesSelected={props?.messagesSelected}
      chatData={props?.chatData}
    />;
  };

  // buscar mensagens quando tocar no topo do scroll
  const handleScroll = (event) => handleScrollEvent(event, props?.getMoreMessages);

  return (
    <View style={styles.containerCenter}>
      <If condition={props?.data?.length > 0}>
        <Animated.FlatList
          ref={flatListMessagesRef}
          style={styles.containerList}
          contentContainerStyle={styles.containerListStyle}
          data={props?.data || []}
          keyExtractor={(item, index) => `chat-messages-${index}`}
          renderItem={renderItem}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
              listener: handleScroll,
            },
          )}
          inverted={-1}
          ListFooterComponent={() =>
            <If condition={props.loadGetMessages}>
              <ButtonGradient
                load={true}
                typeLoad={2}
                sizeLoad={30}
                colors={["transparent", "transparent"]}
                loadColor={colorsSocial.colorA4}
                animationInitial={"slideInDown"}
              />
            </If>
          }
        />
      </If>
      <NoneData
        title={'None messages'}
        show={!props?.data?.length && !props.loadInitial}
        nameIonicons={'chatbubble-ellipses-outline'}
        colorComponents={colorsSocial.colorA4}
      />
    </View>
  );
};

export default memo(ConversationCenter);
