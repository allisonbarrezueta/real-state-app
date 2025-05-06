import "./App.css";
import MainLayout from "./layout/mainLayout";
import { Route, Routes } from "react-router-dom";
import Predictive from "./pages/predictive/Predictive";
import NotFound from "./pages/notFound/notFound";
import Stats from "./pages/stats/Stats";
import Exploratory from "./pages/exploratory/Exploratory";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Predictive />} />
                <Route path="predictive" element={<Stats />} />
                <Route path="stats" element={<Stats />} />
                <Route path="exploratory" element={<Exploratory />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
