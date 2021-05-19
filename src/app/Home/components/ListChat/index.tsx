import React, { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, Animated, View } from "react-native";
import styles from "./styles";
import { images } from "./../../../../assets/general";
import CardListChat from "../../../../components/CardListChat";
import { IChatItem, IPeopleItem, RenderItem } from "./../../../../types";
import { effectAnimationResult } from "./../../../../helpers/animation/index";
import { setSize } from "../../../../helpers/responsive/Index";
import If from "../../../../elements/If";
import Loading from "../../../../elements/Loading";
import { IndexActionsStore } from "./../../../../reduxStore/actions";
import { chat as chatService } from "./../../../../services";
import NoneData from "../../../../components/NoneData";
import ButtonLoadMore from "../../../../elements/ButtonLoadMore";

const ListChat: React.FC = (props): JSX.Element => {

    const {
        actionsChat,
        actionsUser
    } = IndexActionsStore();

    const [imageWallpaper, setImageWallpaper] = useState(images.wallpapers[5]);
    const [load, setLoad] = useState(false);
    const [loadMoreChats, setLoadMoreChats] = useState(false);
    const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
    const flatListRef: React.MutableRefObject<null> = useRef(null);
    const heightCard = setSize(77);
    const limitSearch = 20;
    const user = actionsUser?.userState;

    const data: IChatItem[] = useMemo(() => {
        return actionsChat?.chatState?.chats;
    }, [actionsChat?.chatState?.chats]);

    useEffect(() => {
        getChatsByUser();
    }, []);

    const getChatsByUser = async (): Promise<void> => {
        try {
            setLoad(true);
            const skip = actionsChat?.chatState?.chats?.length || 0;
            const searchValue = actionsChat?.chatState?.searchValue;
            const data = await chatService.getChatsByUser(
                user._id,
                searchValue,
                skip,
                limitSearch
            );
            actionsChat.setChatsOnState(data?.chats);
        } catch (error) {
            console.log("ERRORRR===>", error);
        } finally {
            setLoad(false);
        };
    };

    const getMoreChatsByUser = async (): Promise<void> => {
        try {
            setLoadMoreChats(true);
            const skip = actionsChat?.chatState?.chats?.length || 0;
            const searchValue = actionsChat?.chatState?.searchValue;
            const data = await chatService.getChatsByUser(
                user._id,
                searchValue,
                skip,
                limitSearch
            );
            actionsChat.addChatsOnState(data?.chats);
        } catch (error) {
            console.log("ERRORRR===>", error);
        } finally {
            setLoadMoreChats(false);
        };
    };

    const renderItem = ({ item, index }: RenderItem<IChatItem>): JSX.Element => {

        // validar usuário sem ser o que solicitou
        const userChatNotMe: IPeopleItem = item
            ?.users
            ?.filter((person: IPeopleItem) => person._id !== user._id)[0];

        const inputRange = [
            index * heightCard,
            (index + 2) * heightCard
        ];
        const outputRange = [1, 0];
        const opacity = effectAnimationResult(scrollY, inputRange, outputRange);

        return <CardListChat
            image={imageWallpaper}
            style={{
                opacity,
            }}
            avatar={userChatNotMe ? userChatNotMe?.avatar : user.avatar}
            textTitle={userChatNotMe && userChatNotMe?.fullName || user.fullName || "..."}
            textSubtitle={item?.lastMessage?.value}
            typeMessage={item?.lastMessage?.type}
            hoursMessage={item?.lastMessage?.createdAt}
            animationInitial={"fadeInUp"}
            animationPress={"pulse"}
            iconButtonRight={"chatbox-ellipses-outline"}
            online={userChatNotMe ? userChatNotMe?.online : user.online}
            animationDuration={1000}
        />;
    };

    return <ImageBackground
        blurRadius={7}
        style={styles.imageBackground}
        source={imageWallpaper}>
        <If condition={load}>
            <Loading />
        </If>
        <If condition={data.length > 0}>
            <View>
                <Animated.FlatList
                    ref={flatListRef}
                    style={styles.containerList}
                    // contentContainerStyle={styles.containerListStyle}
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={32}
                />
            </View>
        </If>
        <If condition={!load && data.length <= 0}>
            <NoneData 
                image={imageWallpaper}
                title={"None Chats"}
                nameIonicons={"chatbox-ellipses-outline"}
                onPress={getChatsByUser}
            />
        </If>
        <If condition={!load && data.length > 0}>
            <ButtonLoadMore 
                load={loadMoreChats}
                onPress={getMoreChatsByUser}
            />
        </If>
    </ImageBackground>
};

export default ListChat;