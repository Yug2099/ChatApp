import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="383877989715-odr1dp3akblaeavsmpf0hbqv8gj785nv.apps.googleusercontent.com">
        <div className="content">
          <Routes>
            <Route path="/" Component={Homepage} exact />
            <Route path="/chats" Component={Chatpage} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
