import React, { useState } from "react";
import { View, Text } from "react-native";
import Logo from "../../elements/Logo/index";
import styles from "./styles";
import { Button, TextInput } from "react-native-paper"; 
import { Toast } from "./../../elements/ToastSocial";
import If from "./../../elements/If"
import { errorHandling, validateEmail } from "../../helpers/global";
import { IUser, IUserCreate } from "../../types";
import  { user as userService }  from "./../../services/index";
import TextInputMask from "react-native-text-input-mask";

const SignUp: React.FC = (props): JSX.Element  => {

    const [user, setUser] = useState<IUserCreate>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [inputs, setInputs] = useState({
        fullName: false,
        email: false,
        emailFormat: false,
        phone: false,
        phoneFormat: false,
        password: false,
    });

    const validateInputs = () => {
        let numInputsInvalid = 0
        for (const key in user) {
            if (user[key].trim() === "") {
                numInputsInvalid++;
                setInputs(inp => ({ ...inp, [key]: true}));
            } else {
                if (key === "email") {
                    if (!validateEmail(user[key])) {
                        numInputsInvalid++;
                        setInputs(inp => ({ ...inp, email: false, emailFormat: true}));
                    } else {
                        setInputs(inp => ({ ...inp, email: false, emailFormat: false}));
                    }
                } else if (key === "phone"){
                    if (user[key].length < 20) {
                        numInputsInvalid++;
                        setInputs(inp => ({ ...inp, phone: false, phoneFormat: true}));
                    } else {
                        setInputs(inp => ({ ...inp, phone: false, phoneFormat: false}));
                    }
                } else {
                    setInputs(inp => ({ ...inp, [key]: false}));
                }
            }
        };

        if (numInputsInvalid > 0) {
            Toast("Fill in the required fields", 1000, true);
            return true;
        }

        return false;
    };

    const clearUser = () => {
        setUser({
            fullName: "",
            email: "",
            phone: "",
            password: "",
        });
    };

    const createUser = async () => {
        try {
            if (validateInputs()) return false;
            const userResponse: IUser = await userService.signUp(user);
            Toast("Created with success!");
            clearUser();
        } catch (error) {
            Toast(errorHandling(error), 2000, true);
        };
    };

    return <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Logo/>
        </View>
        
        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, fullName: false }))}
            mode="outlined"
            label="Full Name"
            value={user.fullName}
            error={inputs.fullName}
            onChangeText={text => setUser({ ...user, fullName: text })}
        />
        <If condition={inputs.fullName}>
            <Text style={styles.textRequired}>Full Name is required</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, email: false, emailFormat: false }))}
            keyboardType="email-address"
            mode="outlined"
            label="Email"
            value={user.email}
            error={inputs.email || inputs.emailFormat}
            onChangeText={text => setUser({ ...user, email: text })}
        />
        <If condition={inputs.email}>
            <Text style={styles.textRequired}>Email is required</Text>
        </If>
        <If condition={inputs.emailFormat}>
            <Text style={styles.textRequired}>Format email is invalid</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, phone: false }))}
            keyboardType="phone-pad"
            mode="outlined"
            label="Phone"
            value={user.phone}
            error={inputs.phone || inputs.phoneFormat}
            onChangeText={text => setUser({ ...user, phone: text })}
            render={props =>
                <TextInputMask
                  {...props}
                  mask="+[00] ([00]) [0] [0000]-[0000]"
                />
            }
        />
        <If condition={inputs.phone}>
            <Text style={styles.textRequired}>Phone is required</Text>
        </If>
        <If condition={inputs.phoneFormat}>
            <Text style={styles.textRequired}>Phone format incorrect</Text>
        </If>

        <TextInput
            style={styles.input}
            onFocus={() => setInputs(input => ({ ...input, password: false }))}
            mode="outlined"
            label="Password"
            secureTextEntry={true}
            value={user.password}
            error={inputs.password}
            onChangeText={text => setUser({ ...user, password: text })}
        />
        <If condition={inputs.password}>
            <Text style={styles.textRequired}>Password is required</Text>
        </If>

        <Button 
            style={styles.buttonSignUp}
            mode="contained" 
            onPress={() => createUser()}>
            <Text style={styles.textCreate}>Create</Text>
        </Button>
        <Button
            style={styles.buttonSignIn} 
            onPress={() => props.navigation.navigate("SignIn")}>
            Go To SignIn?
        </Button>
    </View>;
};

export default SignUp;