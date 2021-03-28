import styled from 'styled-components';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../../firebase';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

const ChatPage = ({ chat, messages }) => {
    const [loggedInUser] = useAuthState(auth);

    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, loggedInUser)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <Chat chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    );
};

export default ChatPage;

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    // Prepare messages on the server
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }));

    // Prepare chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    };

    return {
        props: {
            messages: JSON.stringify(messages),
            chat,
        },
    };
}

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100%;

    ::-webkit-scrollbar {
        display: none;
    }

    --ms-overflow-style: none;
    scrollbar-width: none;
`;
