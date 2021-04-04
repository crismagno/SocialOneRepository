import React, { useState, useRef, MutableRefObject } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./styles";
import { Button } from "react-native-paper"
import ButtonGradient from "../../elements/ButtonGradient";
import actionsUser from "../../reduxStore/actions/user";
import { backgrounds } from "../../assets/general/images";
import { code as codeService } from "./../../services"
import { ToastSocial } from "./../../elements/ToastSocial";
import localStorage from "./../../infra/localStorage"
import { colorsSocial } from "../../assets/general/colors";
import { errorHandling } from "../../helpers/global";
import actionsNavigation from "./../../navigation/actions"

const VerifyCode: React.FC = (props): JSX.Element => {

    const {
        userState
    } = actionsUser();

    const execActionsNavigation = actionsNavigation(props);

    const quantityInputs: number = 4;
    const inputsArrayString: string[] = Array(quantityInputs).fill("");
    const inputsRef: MutableRefObject<any>[] = inputsArrayString.map(() => useRef());

    const [code, setCode] = useState<string[]>(inputsArrayString);
    const [load, setLoad] = useState<boolean>(false);

    const goToRoute = (route: string): void => {
        execActionsNavigation.resetHistory(route);
    };

    const changeInput = (value: string, item: number): void => {
        if (item === 0) {
            if (value.trim()) {            
                inputsRef[1].current.focus()
            }
        } 
        else if (item === 1) {
            if (!value.trim()) {            
                inputsRef[0].current.focus()
            } else {
                inputsRef[2].current.focus()
            }
        }
        else if (item === 2) {
            if (!value.trim()) {            
                inputsRef[1].current.focus()
            } else {
                inputsRef[3].current.focus()
            }
        }
        else if (item === 3) {
            if (!value.trim()) {            
                inputsRef[2].current.focus()
            } 
        }
        let codeClone = [...code];
        codeClone.splice(item, 1, String(value).toUpperCase());
        setCode([...codeClone]);
    };

    const validateInputs = (): boolean => {
        const validCode = code.join("").replace(" ", "");
        if (validCode.length < quantityInputs) {
            ToastSocial({ message: "Fill all field", type: "danger" });
            return true;
        }
        return false;
    };

    const validateCode = async (): Promise<void> => {
        try {
            if (validateInputs()) return;
            setLoad(true);
            const codeBody = code.join("");
            const response = await codeService.validateCode({
                userId: userState._id,
                code: codeBody
            });
            localStorage.setUser(userState);
            ToastSocial({ message: response.message });
        } catch (error) {
            ToastSocial({ message: errorHandling(error), type: "danger" });
        } finally {
            setLoad(false);
        }
    };

    const resendCode = async (): Promise<void> => {
        try {
            const response = await codeService.resendCode({
                userId: userState._id
            });
            ToastSocial({ message: response.message });
        } catch (error) {
            ToastSocial({ message: errorHandling(error), type: "danger" });
        }
    };

    return <View style={styles.container}>
        <Image  style={styles.imageTop} source={backgrounds[0]} />
        <Image  style={styles.imageBottom} source={backgrounds[2]} />
        <View style={styles.containerTop}>
            <Button 
                color={colorsSocial.colorA1}
                style={styles.buttonTopLeft}
                icon="arrow-left" 
                onPress={() => goToRoute("SignIn")}>
                SIGNIN
            </Button>
        </View>
        <View style={styles.containerCenter}>
            <Text style={styles.textSend}>Social Send</Text>
            <View style={styles.viewInputsCode}>
                {code.map((_, index: number): JSX.Element => {
                    return <TextInput
                        key={index}                
                        onSubmitEditing={() => 
                            (index !== code.length -1) && inputsRef[index+1].current.focus()
                        }
                        ref={inputsRef[index]}
                        blurOnSubmit={false}
                        style={styles.inputCode}
                        onChangeText={text => changeInput(text, index)}
                        value={code[index]}
                        maxLength={1}
                        selectionColor={colorsSocial.colorA3}
                    />
                })}
            </View>
            <View style={styles.viewInformation}>
                <Text style={styles.textUserInfo}>
                    Olá {userState.fullName}! 
                    We have some informations for you above.
                </Text>
                <Text style={styles.textInfo}>
                    INFORMATION:
                    Please check the code in your E-mail box,
                    or in the SMS of the registered Phone.
                </Text>
            </View>
        </View>
        <View style={styles.containerBottom}>
            <ButtonGradient 
                style={styles.buttonVerify}
                label="verify"
                toUpperCase={true}
                load={load}
                onPress={() => validateCode()}
            />
            <Button onPress={() => resendCode()}>
                resend
            </Button>
        </View>
    </View>;
};

export default VerifyCode;
