import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import styles from './styles';
import {colorsSocial, images} from './../../../../assets/general';
import CardListChat from '../../../../components/CardListChat';
import {IChatItem, IPeopleItem, RenderItem} from './../../../../types';
import {effectAnimationResult} from './../../../../helpers/animation/index';
import {setSize} from '../../../../helpers/responsive/Index';
import If from '../../../../elements/If';
import Loading from '../../../../elements/Loading';
import {IndexActionsStore} from './../../../../reduxStore';
import {chat as chatService} from './../../../../services';
import NoneData from '../../../../components/NoneData';
import ButtonLoadMore from '../../../../elements/ButtonLoadMore';
import Search from '../../../../components/Search';
import {
  errorHandling,
  returnColorBasedOnLight,
} from '../../../../helpers/global';
import ViewGradient from '../../../../elements/ViewGradient';
import {handleScrollEvent} from '../../../../helpers/scroll';
import SnackBarSocialDefault from '../../../../elements/SnackBarSocial';

const ListChat: React.FC<any> = (props): JSX.Element => {
  const {actionsChat, actionsUser} = IndexActionsStore();

  // dados dos chat ordenados por data da ultima mensagem
  const data: IChatItem[] = actionsChat?.state?.chats?.sort(
    (a: any, b: any) =>
      new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt),
  );

  const [load, setLoad] = useState(false);
  const [loadMoreChats, setLoadMoreChats] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
  const flatListRef: React.MutableRefObject<null> = useRef(null);
  const heightCard = setSize(77);
  const limitSearch = 10;
  const user = actionsUser?.state;
  const colorComponents: string = colorsSocial.colorA1;

  // metodos de criacao do componente
  useEffect(() => {
    getChatsByUser();
  }, []);

  const getChatsByUser = async (): Promise<void> => {
    try {
      setLoad(true);
      const skip = actionsChat?.state?.chats?.length || 0;
      const searchValue = actionsChat?.state?.searchValue;
      const data = await chatService.getChatsByUser(
        user._id,
        searchValue,
        skip,
        limitSearch,
      );
      actionsChat.setChats(data?.chats);
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA13,
        colorButton: colorsSocial.colorA13,
      });
    } finally {
      setLoad(false);
    }
  };

  const getMoreChatsByUser = async (): Promise<void> => {
    try {
      setLoadMoreChats(true);
      const skip = actionsChat?.state?.chats?.length || 0;
      const searchValue = actionsChat?.state?.searchValue;
      const data = await chatService.getChatsByUser(
        user._id,
        searchValue,
        skip,
        limitSearch,
      );
      actionsChat.addChats(data?.chats);
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA13,
        colorButton: colorsSocial.colorA13,
      });
    } finally {
      setLoadMoreChats(false);
    }
  };

  const changeValueSearch = async (searchValue: string): Promise<void> => {
    try {
      actionsChat?.setSearchValue(searchValue);
      setLoadMoreChats(true);
      const data = await chatService.getChatsByUser(
        user._id,
        searchValue,
        0,
        limitSearch,
      );
      actionsChat.setChats(data?.chats);
    } catch (error) {
      SnackBarSocialDefault({
        text: errorHandling(error),
        duration: 'LENGTH_LONG',
        textColor: colorsSocial.colorA13,
        colorButton: colorsSocial.colorA13,
      });
    } finally {
      setLoadMoreChats(false);
    }
  };

  // pass values of chat to navigation params
  const onPressCardGoToConversation = (item: IChatItem): void => {
    props.navigation.navigate('Conversation', {
      chat: item,
    });
  };

  // buscar chats quando tocar no topo do scroll
  const handleScroll = (event): void =>
    handleScrollEvent(event, getMoreChatsByUser);

  const renderItem = ({item, index}: RenderItem<IChatItem>): JSX.Element => {
    // validar usuário sem ser o que solicitou
    const userChatNotMe: IPeopleItem[] = item?.users?.filter(
      (person: IPeopleItem) => person._id !== user._id,
    );

    const userChatNotMeValidate: IPeopleItem =
      (userChatNotMe && userChatNotMe?.length) > 0 ? userChatNotMe[0] : null;

    const messageIsDisabledToMe =
      item?.lastMessage?.removeToUsers?.indexOf(user?._id) > -1;

    // status do envio da mensagem se visto pelos outros usuarios
    const statusSendMessage =
      item?.lastMessage?.seenUsers?.length === item?.users?.length;
    const wasThisUserThatSendLastMessage =
      item?.lastMessage?.userSent === user?._id;

    // parte da animacao do componente
    const inputRange = [index * heightCard, (index + 2) * heightCard];
    const outputRange = [1, 0];
    const opacity = effectAnimationResult(scrollY, inputRange, outputRange);

    return (
      <CardListChat
        style={{
          opacity,
        }}
        user={user}
        colorComponents={colorComponents}
        avatar={
          userChatNotMeValidate ? userChatNotMeValidate?.avatar : user?.avatar
        }
        textTitle={
          (userChatNotMeValidate && userChatNotMeValidate?.fullName) ||
          user.fullName ||
          '...'
        }
        textSubtitle={item?.lastMessage?.value}
        typeMessage={item?.lastMessage?.type}
        hoursMessage={item?.lastMessage?.createdAt}
        statusSendMessage={statusSendMessage}
        animationInitial={'slideInDown'}
        animationPress={'pulse'}
        iconButtonRight={'chatbox-ellipses-outline'}
        messageIsDisabled={messageIsDisabledToMe}
        online={
          userChatNotMeValidate ? userChatNotMeValidate?.online : user?.online
        }
        animationDuration={1000}
        onPressCard={() => onPressCardGoToConversation(item)}
        actionChat={item?.actionChat}
        showStatusMessage={wasThisUserThatSendLastMessage}
      />
    );
  };

  return (
    <ViewGradient style={styles.imageBackground}>
      <Loading show={load} />
      <Search
        style={{
          transform: [
            {
              translateX: effectAnimationResult(
                scrollY,
                [0, 80, 100],
                [0, 20, 50],
              ),
            },
          ],
          height: effectAnimationResult(scrollY, [0, 30, 120], [50, 40, 0]),
          opacity: effectAnimationResult(scrollY, [1, 30, 40], [1, 1, 0]),
        }}
        show={true}
        value={actionsChat?.state?.searchValue}
        setValue={changeValueSearch}
        placeholder={'Search'}
        colorComponents={colorComponents}
      />
      <If condition={data.length > 0}>
        <View>
          <Animated.FlatList
            ref={flatListRef}
            style={styles.containerList}
            contentContainerStyle={styles.containerListStyle(showSearch)}
            data={data.map((el: IChatItem, index: number) => ({
              ...el,
              key: `chats-${index}`,
            }))}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
                listener: handleScroll,
              },
            )}
            scrollEventThrottle={32}
            onEndReachedThreshold={0.01}
            ListFooterComponent={() => (
              <View style={styles.viewButtonBottomLoadList}>
                <ButtonLoadMore
                  colorComponents={colorComponents}
                  load={loadMoreChats}
                  onPress={getMoreChatsByUser}
                />
              </View>
            )}
          />
        </View>
      </If>
      <NoneData
        show={!load && data.length <= 0}
        colorComponents={colorComponents}
        title={'None Chats'}
        nameIonicons={'chatbox-ellipses-outline'}
        onPress={getChatsByUser}
      />
      {/* <Draggable
        x={setSize(340)}
        y={setSize(680)}
        maxY={setSize(740)}
        maxX={setSize(395)}
        minX={setSize(10)}
        minY={setSize(10)}>
        <ButtonIcon
          show={!load}
          colorComponents={colorIcon}
          colorIcon={colorComponents}
          nameIcon={'search'}
          onPress={() => setShowSearch(!showSearch)}
        />
      </Draggable> */}
    </ViewGradient>
  );
};

export default ListChat;
