import React from "react";
import { useNotification } from "../components/CustomToast";

const App: React.FC = () => {
    const { showNotification } = useNotification();

    const handleShowNotification = () => {
        showNotification("This is a notification!", "success");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={handleShowNotification}
                className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
            >
                Show Notification
            </button>
        </div>
    );
};

export default App;
