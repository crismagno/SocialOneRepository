// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

export const startNotifications = (): void => {
    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
        },
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);
        },
        onRegistrationError: function(err) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions:  Platform.OS === 'ios',
    });
};

export const localNotificationSchedule = (params: {
    channelId: "channel-id";
    channelName: string;
    title: string;
    message: string;
    date?: number;
}): void => {
    PushNotification.localNotificationSchedule({
        channelId: params.channelId || "channel-id",
        channelName: params.channelName || "My channel",
        title: params.title || "Test",
        message: params.message || "My Notification Message",
        date: new Date(Date.now() + (params.date || 1) * 1000), 
    });
};

export default {
    startNotifications,
    localNotificationSchedule
}