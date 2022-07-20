import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import ChatScreen from "../../components/ChatScreen";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const chatRef = doc(db, "chats", context.query.id);

  // prepare the messages on the server
  const chatDoc = await getDoc(chatRef, orderBy("timestamp", "asc"));

  const chat = {
    id: chatDoc.id,
    ...chatDoc.data(),
  };

  // console.log(chat);

  const querySnapshot = await getDocs(collection(chatRef, "messages"));

  const messages = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    messages.push({
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().getTime(),
      ...doc.data(),
    });
  });

  //   console.log(chat);

  return {
    props: {
      chat: chat,
      messages: JSON.stringify(messages),
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  /* Ngilangin srollbar */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* firefox */
`;
