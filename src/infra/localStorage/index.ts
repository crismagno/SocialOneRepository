import AsyncStorage from '@react-native-community/async-storage';
import {IUser, TStepApp} from '../../types';
import LocalStorageEnum from './enum';
import variablesLocalStorage from './enum';

/**
 * Note: change functions to class and methods class
 */

// ================= USER SESSION ========================
export const setUser = async (user: IUser): Promise<boolean> => {
  if (!user) return false;

  try {
    const userFormatted: string = JSON.stringify(user);
    await AsyncStorage.setItem(LocalStorageEnum.Keys.USER, userFormatted);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUser = async (): Promise<IUser | null> => {
  try {
    const userStorage: string = await AsyncStorage.getItem(
      LocalStorageEnum.Keys.USER,
    );
    if (userStorage && userStorage.trim()) {
      const userStorageFormatted: IUser = JSON.parse(userStorage);
      return userStorageFormatted;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(LocalStorageEnum.Keys.USER);
    return true;
  } catch (error) {
    return false;
  }
};

export const updatePropertyUser = async (
  property: keyof IUser,
  newValue: string,
): Promise<IUser | null> => {
  try {
    const userStorage: string = await AsyncStorage.getItem(
      LocalStorageEnum.Keys.USER,
    );

    // valid if user exists
    if (userStorage && userStorage.trim()) {
      const userStorageObject: IUser = JSON.parse(userStorage);

      // valid property was passed
      if (!property) {
        console.log('Property not exists!!!');
        return userStorageObject;
      }

      // update property user
      const userStorageUpdated = {
        ...userStorageObject,
        [`${property}`]: newValue,
      };

      // transform user updated to it will be saved os storage
      const userFormatted: string = JSON.stringify(userStorageUpdated);
      await AsyncStorage.setItem(LocalStorageEnum.Keys.USER, userFormatted);

      return userStorageUpdated;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// ========= STEP APPLICATION=========
export const setStep = async (step: TStepApp): Promise<boolean> => {
  if (!step) return false;

  try {
    await AsyncStorage.setItem(LocalStorageEnum.Keys.STEP, step);
    return true;
  } catch (error) {
    return false;
  }
};

export const getStep = async (): Promise<TStepApp | null> => {
  try {
    const stepStorage: TStepApp = (await AsyncStorage.getItem(
      LocalStorageEnum.Keys.STEP,
    )) as TStepApp;
    if (stepStorage && stepStorage.trim()) {
      return stepStorage;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeStep = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(LocalStorageEnum.Keys.STEP);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getUser,
  setUser,
  removeUser,
  getStep,
  setStep,
  removeStep,
  updatePropertyUser,
};
