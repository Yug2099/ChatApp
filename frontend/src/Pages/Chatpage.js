import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
// import "./Chatpage.css";
import SideDrawer from "../Components/miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} /> }
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;
