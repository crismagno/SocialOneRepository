import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import styles from './styles';
import {colorsSocial} from './../../../../assets/general';
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
import {handleError} from '../../../../helpers/global';
import ViewGradient from '../../../../elements/ViewGradient';
import {handleScrollEvent} from '../../../../helpers/scroll';
import {IUserInitialState} from '../../../../reduxStore/user/types';

const ListChat: React.FC<any> = (props): JSX.Element => {
  const {actionsChat, actionsUser} = IndexActionsStore();

  const data: IChatItem[] = actionsChat?.state?.chats?.sort(
    (a: any, b: any) =>
      new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt),
  );

  const [load, setLoad] = useState<boolean>(false);

  const [loadMoreChats, setLoadMoreChats] = useState<boolean>(false);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;

  const flatListRef: React.MutableRefObject<null> = useRef(null);

  const heightCard: number = setSize(77);

  const limitSearch: number = 10;

  const user: IUserInitialState = actionsUser?.state;

  const colorComponents: string = colorsSocial.colorA1;

  useEffect(() => {
    getChatsByUser();
  }, []);

  const getChatsByUser = async (): Promise<void> => {
    try {
      setLoad(true);

      const skip: number = actionsChat?.state?.chats?.length || 0;

      const searchValue = actionsChat?.state?.searchValue;

      const data = await chatService.getChatsByUser(
        user._id,
        searchValue,
        skip,
        limitSearch,
      );

      actionsChat.setChats(data?.chats);
    } catch (error: any) {
      handleError(error);
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
      handleError(error);
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
      handleError(error);
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

  const dataSource = data.map((item: IChatItem, index: number) => ({
    ...item,
    key: `chats-${index}`,
  }));

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
            data={dataSource}
            keyExtractor={({key}) => key}
            renderItem={renderItem}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: false,
                listener: (event: any) =>
                  handleScrollEvent(event, getMoreChatsByUser),
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
          colorComponents={'#000'}
          colorIcon={colorComponents}
          nameIcon={'search'}
          onPress={() => setShowSearch(!showSearch)}
        />
      </Draggable> */}
    </ViewGradient>
  );
};

export default ListChat;
