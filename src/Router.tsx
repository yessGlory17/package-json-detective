import Editor from "./views/Editor";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;