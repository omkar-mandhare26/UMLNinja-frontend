// src/providers/NotificationProvider.tsx
import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

// Define notification variant types
type NotificationVariant = "default" | "error" | "success" | "warning" | "info";

// Define notification options interface
interface NotificationOptions {
    variant?: NotificationVariant;
    autoHideDuration?: number;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}

// Create a custom hook for using notifications
export const useNotification = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showNotification = (
        message: string,
        options: NotificationOptions = {}
    ) => {
        const {
            variant = "default",
            autoHideDuration = 3000,
            anchorOrigin = {
                vertical: "top",
                horizontal: "right",
            },
        } = options;

        return enqueueSnackbar(message, {
            variant,
            autoHideDuration,
            anchorOrigin,
        });
    };

    return {
        success: (
            message: string,
            options?: Omit<NotificationOptions, "variant">
        ) => showNotification(message, { ...options, variant: "success" }),
        error: (
            message: string,
            options?: Omit<NotificationOptions, "variant">
        ) => showNotification(message, { ...options, variant: "error" }),
        warning: (
            message: string,
            options?: Omit<NotificationOptions, "variant">
        ) => showNotification(message, { ...options, variant: "warning" }),
        info: (
            message: string,
            options?: Omit<NotificationOptions, "variant">
        ) => showNotification(message, { ...options, variant: "info" }),
        default: (
            message: string,
            options?: Omit<NotificationOptions, "variant">
        ) => showNotification(message, { ...options, variant: "default" }),
        close: closeSnackbar,
    };
};

// Create the provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

// Example usage component
const ExampleComponent: React.FC = () => {
    const notification = useNotification();

    const handleShowNotifications = () => {
        notification.success("Operation completed successfully!");
        notification.error("Something went wrong!");
        notification.warning("Please be careful!");
        notification.info("Just letting you know...");
        notification.default("Regular notification");
    };

    return (
        <button onClick={handleShowNotifications}>Show Notifications</button>
    );
};

export default ExampleComponent;
