import React, { useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, Animated } from "react-native";
import { images } from "../../assets/general";
import CardListPeople from "../../components/CardListPeople/index";
import If from "../../elements/If";
import Loading from "../../elements/Loading";
import { IPeopleItem, RenderItem } from "../../types";
import styles from "./styles";
import { user as userService } from "./../../services/index";
import { IndexActionsStore } from "./../../reduxStore/actions";
import ButtonGradient from "./../../elements/ButtonGradient";
import { setSize } from "../../helpers/responsive/Index";
import { chat as chatService } from "./../../services";
import NoneData from "../../components/NoneData";

const People: React.FC = (props): JSX.Element => {

    const {
        actionsPeople,
        actionsUser
    } = IndexActionsStore();
    
    const [imageWallpaper, setImageWallpaper] = useState(images.wallpapers[5]);
    const [load, setLoad] = useState(true);
    const limitSearch = 20;
    const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
    const flatListRef: React.MutableRefObject<null> = useRef(null);

    const data = useMemo(() => {
        return actionsPeople?.peopleState?.people;
    }, [actionsPeople?.peopleState?.people]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async (): Promise<void> => {
        try {
            const skip = actionsPeople?.peopleState?.people?.length || 0;
            const searchValue = actionsPeople?.peopleState?.searchValue;
            const people = await userService.getUsers(
                searchValue, 
                skip, 
                limitSearch
            );
            actionsPeople.setPeopleOnState(people);
        } catch (error) {   
            console.log("ERRORRR===>",error);
        } finally {
            setLoad(false);
        };
    };

    const addUserForMyChat = async (person: IPeopleItem): Promise<void> => {
        try {
            const data = await chatService
                .create(actionsUser.userState._id, person._id);
            props.navigation.navigate("Home");
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = ({ item, index }: RenderItem<IPeopleItem>): JSX.Element => {
        return <CardListPeople 
            image={imageWallpaper}
            avatar={images.avatars[0]}
            textTitle={item.fullName || "..."}
            textSubtitle={item.email || "..."}
            animationInitial={"fadeIn"}
            animationDuration={1000}
            animationPress={"pulse"}
            iconButtonRight={"add-circle-outline"}
            online={item.online || false}
            onPressCard={() => addUserForMyChat(item)}
        />;
    };

    return <ImageBackground
        blurRadius={5}
        style={styles.imageBackground}
        source={imageWallpaper}>
            <If condition={load}>
                <Loading />
            </If>
            <If condition={data.length > 0}>
                <Animated.FlatList
                    ref={flatListRef}
                    style={styles.containerList} 
                    contentContainerStyle={styles.containerListStyle}
                    data={data.map((el: any, key: number) => ({ ...el, key: key }))}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem ={renderItem}
                    horizontal={false}
                    showsVerticalScrollIndicator={true}
                    onScroll={Animated.event(
                        [{nativeEvent: { contentOffset: { y: scrollY } }}],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={32}
                />
                {/* <If condition={true}>
                    <ButtonGradient 
                        style={{
                            borderRadius: 20,
                            width: setSize(100)
                        }}
                        label={"PEOPLE+"}
                    />
                </If> */}
            </If>
            <If condition={!load && data.length <= 0}>
                <NoneData 
                    image={imageWallpaper}
                    title={"None people"}
                    nameIonicons={"people-outline"}
                />
            </If>
    </ImageBackground>
};

export default People;