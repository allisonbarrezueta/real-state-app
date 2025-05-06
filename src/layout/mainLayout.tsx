import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="flex justify-center items-center flex-col">
                <img src={"src/assets/bcn.jpg"} className="bg-cover w-full h-[25vh] object-cover bg-bottom" alt="Vite logo" />
            </div>
            <Navbar />
            <div className="w-full flex flex-col h-full p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
