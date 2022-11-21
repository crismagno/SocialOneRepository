import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import {colorsSocial} from '../../assets/general';
import CardListPeople from '../../components/CardListPeople/index';
import If from '../../elements/If';
import Loading from '../../elements/Loading';
import {IPeopleItem, RenderItem} from '../../types';
import styles from './styles';
import {user as userService} from './../../services/index';
import {IndexActionsStore} from './../../reduxStore';
import {chat as chatService} from './../../services';
import NoneData from '../../components/NoneData';
import Search from '../../components/Search';
import ButtonLoadMore from '../../elements/ButtonLoadMore';
import {handleError} from '../../helpers/global';
import {ViewGradient} from '../../elements/ViewGradient';
import {handleScrollEvent} from './../../helpers/scroll';
import {effectAnimationResult} from '../../helpers/animation';

const People: React.FC<any> = (props): JSX.Element => {
  const {actionsPeople, actionsUser} = IndexActionsStore();

  const [load, setLoad] = useState(true);

  const [loadMoreChats, setLoadMoreChats] = useState(false);

  const limitSearch = 10;

  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;

  const flatListRef: React.MutableRefObject<null> = useRef(null);

  const data = actionsPeople?.state?.people;

  const [colorComponents, setColorComponents] = useState(colorsSocial.colorA1); // cor principal dos componentes filhos

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (): Promise<void> => {
    try {
      const skip = actionsPeople?.state?.people?.length || 0;
      const searchValue = actionsPeople?.state?.searchValue;
      const people = await userService.getUsers(searchValue, skip, limitSearch);
      actionsPeople.setPeople(people);
    } catch (error) {
      handleError(error);
    } finally {
      setLoad(false);
    }
  };

  const getMorePeople = async (): Promise<void> => {
    try {
      setLoadMoreChats(true);
      const skip = actionsPeople?.state?.people?.length || 0;
      const searchValue = actionsPeople?.state?.searchValue;
      const people = await userService.getUsers(searchValue, skip, limitSearch);
      actionsPeople?.addPeople(people);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadMoreChats(false);
    }
  };

  const changeValueSearch = async (searchValue: string): Promise<void> => {
    try {
      actionsPeople?.setSearchValue(searchValue);
      setLoadMoreChats(true);
      const people = await userService.getUsers(searchValue, 0, limitSearch);
      actionsPeople.setPeople(people);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadMoreChats(false);
    }
  };

  // buscar users quando tocar no topo do scroll
  const handleScroll = (event) => handleScrollEvent(event, getMorePeople);

  const addUserForMyChat = async (person: IPeopleItem): Promise<void> => {
    try {
      setLoad(true);
      const data = await chatService.create(actionsUser.state._id, person._id);
      props.navigation.navigate('Conversation', {
        chat: data.chat,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoad(false);
    }
  };

  const renderItem = ({item, index}: RenderItem<IPeopleItem>): JSX.Element => {
    return (
      <CardListPeople
        colorComponents={colorComponents}
        avatar={item.avatar}
        textTitle={item.fullName || '...'}
        textSubtitle={item.email || '...'}
        animationInitial={'fadeIn'}
        animationDuration={1000}
        animationPress={'pulse'}
        iconButtonRight={'add-circle-outline'}
        online={item.online || false}
        onPressCard={() => addUserForMyChat(item)}
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
              translateY: effectAnimationResult(
                scrollY,
                [0, 20, 100],
                [0, 20, 50],
              ),
            },
          ],
          height: effectAnimationResult(scrollY, [0, 30, 100], [50, 40, 0]),
          opacity: effectAnimationResult(scrollY, [1, 30, 40], [1, 1, 0]),
        }}
        colorComponents={colorComponents}
        show={true}
        value={actionsPeople?.state?.searchValue}
        setValue={changeValueSearch}
        placeholder={'Search'}
      />
      <If condition={data.length > 0}>
        <View>
          <Animated.FlatList
            ref={flatListRef}
            style={styles.containerList}
            contentContainerStyle={styles.containerListStyle}
            data={data.map((el: IPeopleItem, key: number) => ({
              ...el,
              key: key,
            }))}
            keyExtractor={(item) => `people-${item.key}`}
            renderItem={renderItem}
            horizontal={false}
            showsVerticalScrollIndicator={true}
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
                  onPress={getMorePeople}
                />
              </View>
            )}
          />
        </View>
      </If>
      <NoneData
        show={!load && data.length <= 0}
        colorComponents={colorComponents}
        title={'None people'}
        nameIonicons={'people-outline'}
        onPress={getUsers}
      />
    </ViewGradient>
  );
};

export default People;
