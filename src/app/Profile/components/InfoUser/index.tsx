import React from 'react';
import {ScrollView} from 'react-native';
import {IUser} from '../../../../types';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setSize} from '../../../../helpers/responsive/Index';
import {colorsSocial} from '../../../../assets/general';
import CardInfoDescription from '../../../../components/CardInfoDescription';
import { TextInput } from 'react-native-paper';

export interface IInfoUserProps {
  user: IUser;
  onAlterInfo: (userProperty: string) => void;
  onLogout: () => void;
  loadFullName?: boolean;
  loadEmail?: boolean;
  loadPhone?: boolean;
  loadPassword?: boolean;
}

const InfoUser: React.FC<IInfoUserProps> = (props): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <CardInfoDescription
        iconLeft={
          <TextInput.Icon 
              name="account" 
              size={setSize(23)}
              color={colorsSocial.colorA4}
              onPress={() => props.onAlterInfo('fullName')}
            />
        }
        iconRightTitle={
          <Ionicons
            name={'pencil'}
            size={setSize(16)}
            color={colorsSocial.colorA4}
          />
        }
        title={'Name'}
        subtitle={props.user.fullName || 'name...'}
        description={'This name will show on all chats, and users.'}
        onPress={() => props.onAlterInfo('fullName')}
        load={props.loadFullName}
      />
      <CardInfoDescription
        iconLeft={
          <TextInput.Icon 
              name="at" 
              size={setSize(20)}
              color={colorsSocial.colorA4}
              onPress={() => props.onAlterInfo('email')}
            />
        }
        iconRightTitle={
          <Ionicons
            name={'pencil'}
            size={setSize(16)}
            color={colorsSocial.colorA4}
          />
        }
        title={'Email'}
        subtitle={props.user.email || 'email...'}
        description={'This is your email.'}
        onPress={() => props.onAlterInfo('email')}
        load={props.loadEmail}
      />
      <CardInfoDescription
        iconLeft={
          <TextInput.Icon 
              name="phone" 
              size={setSize(20)}
              color={colorsSocial.colorA4}
              onPress={() => props.onAlterInfo('phone')}
            />
        }
        iconRightTitle={
          <Ionicons
            name={'pencil'}
            size={setSize(16)}
            color={colorsSocial.colorA4}
          />
        }
        title={'Phone'}
        subtitle={props.user.phone || 'phone...'}
        onPress={() => props.onAlterInfo('phone')}
        load={props.loadPhone}
      />
      <CardInfoDescription
        iconLeft={
          <TextInput.Icon 
              name="key" 
              size={setSize(20)}
              color={colorsSocial.colorA4}
              onPress={() => props.onAlterInfo('phone')}
            />
        }
        iconRightTitle={
          <Ionicons
            name={'pencil'}
            size={setSize(16)}
            color={colorsSocial.colorA4}
          />
        }
        title={'Password'}
        subtitle={'**********'}
        onPress={() => props.onAlterInfo('password')}
        load={props.loadPassword}
      />
      <CardInfoDescription
        iconLeft={
          <TextInput.Icon 
              name="logout" 
              size={setSize(20)}
              color={colorsSocial.colorA4}
              onPress={() => props.onLogout()}
            />
        }
        title={'Logout'}
        subtitle={'Go out of Social'}
        onPress={props.onLogout}
      />
    </ScrollView>
  );
};

export default InfoUser;
