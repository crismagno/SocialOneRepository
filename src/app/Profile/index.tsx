import React, {useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {user as userService} from './../../services';
import {IndexActionsStore} from './../../reduxStore';
import localStorage from '../../infra/localStorage';
import AvatarWithDescription from './components/AvatarWithDescription';
import * as ImagePicker from 'react-native-image-picker';
import styles from './styles';
import {Asset} from 'react-native-image-picker';
import {createFormData} from '../../helpers/files';
import {resetHistory} from './../../navigation/actions';
import {ToastSocial} from './../../elements/ToastSocial';
import InfoUser from './components/InfoUser';
import Loading from '../../elements/Loading';
import ModalAlterEmail from './components/ModalAlterEmail';
import ModalAlterFullName from './components/ModalAlterFullName';
import ModalAlterPhone from './components/ModalAlterPhone';
import SnackBarSocialDefault from '../../elements/SnackBarSocial';
import {colorsSocial} from '../../assets/general';
import {TKeysModalProfile} from './types';
import ModalAlterPassword from './components/ModalAlterPassword';

const Profile: React.FC<any> = (props): JSX.Element => {
  // actions state store
  const {actionsUser, actionsSocket} = IndexActionsStore();

  const user = actionsUser?.state;

  const globalSocket = actionsSocket.socketStateStore?.socket;

  const [image, setImage] = useState<Asset>(null);

  const [imageLoad, setImageLoad] = useState<boolean>(false);

  const [showModalAlterFullName, setShowModalAlterFullName] = useState<boolean>(
    false,
  );

  const [showModalAlterEmail, setShowModalAlterEmail] = useState<boolean>(
    false,
  );

  const [showModalAlterPhone, setShowModalAlterPhone] = useState<boolean>(
    false,
  );

  const [showModalAlterPassword, setShowModalAlterPassword] = useState<boolean>(
    false,
  );

  const [showLogout, setShowLogout] = useState<boolean>(false);

  const showSnackbarToLogout = async () => {
    SnackBarSocialDefault({
      text: 'Logout ?',
      colorButton: colorsSocial.colorA1,
      duration: 'LENGTH_LONG',
      onPress: onLogout,
      textAction: 'CONFIRM',
    });
  };

  const onLogout = async () => {
    try {
      setShowLogout(true);
      resetHistory(props, 'SignIn');
      await userService.logoutUser(user._id, globalSocket?.id);
    } catch (error) {
      ToastSocial({message: 'Erro ao fazer logout', type: 'danger'});
    } finally {
      setShowLogout(false);
    }
  };

  const onChooseAvatar = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    ImagePicker.launchImageLibrary(
      options,
      (response: ImagePicker.ImagePickerResponse | any) => {
        if (response?.assets?.length > 0) {
          setImage(response.assets[0]);
        }
      },
    );
  };

  const onChooseAvatarCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
    } else {
      console.log('Camera permission denied');
    }

    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'front',
    };

    ImagePicker.launchCamera(
      options,
      (response: ImagePicker.ImagePickerResponse | any) => {
        if (response?.assets?.length > 0) {
          setImage(response.assets[0]);
        }
      },
    );
  };

  const onConfirmChangeAvatar = async () => {
    try {
      setImageLoad(true);
      const formatData = createFormData(image, {userId: user._id}, 'avatar');
      const response: any = await userService.changeAvatar(formatData);
      actionsUser.updateProfileInfo('avatar', response.avatar);
      await localStorage.updatePropertyUser('avatar', response.avatar);
      SnackBarSocialDefault({
        text: 'Your avatar was updated with success.',
        colorButton: colorsSocial.colorA4,
      });
    } catch (error) {
      ToastSocial({
        message: 'Erro ao atualizar avatar',
        type: 'danger',
      });
    } finally {
      setImage(null);
      setImageLoad(false);
    }
  };

  const onAlterInfo = (userProperty: TKeysModalProfile): void => {
    switch (userProperty) {
      case 'fullName':
        setShowModalAlterFullName(true);
        break;
      case 'email':
        setShowModalAlterEmail(true);
        break;
      case 'phone':
        setShowModalAlterPhone(true);
        break;
      case 'password':
        setShowModalAlterPassword(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Loading description={'Bye!'} show={showLogout} />
      <AvatarWithDescription
        onChooseAvatar={onChooseAvatar}
        onChooseAvatarCamera={onChooseAvatarCamera}
        onConfirmChangeAvatar={onConfirmChangeAvatar}
        imageAvatar={image}
        imageAvatarLoad={imageLoad}
        user={user}
        cancelImage={() => setImage(null)}
      />
      <InfoUser
        user={user}
        onAlterInfo={onAlterInfo}
        onLogout={showSnackbarToLogout}
      />

      {/* modals update informations user */}
      <ModalAlterFullName
        show={showModalAlterFullName}
        onClose={() => setShowModalAlterFullName(false)}
      />
      <ModalAlterEmail
        show={showModalAlterEmail}
        onClose={() => setShowModalAlterEmail(false)}
      />
      <ModalAlterPhone
        show={showModalAlterPhone}
        onClose={() => setShowModalAlterPhone(false)}
      />
      <ModalAlterPassword
        show={showModalAlterPassword}
        onClose={() => setShowModalAlterPassword(false)}
      />
    </View>
  );
};

export default Profile;
