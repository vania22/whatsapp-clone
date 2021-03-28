import styled from 'styled-components';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';

const Chat = () => {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <h1>Hello</h1>
            </ChatContainer>
        </Container>
    );
};

export default Chat;

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const ChatContainer = styled.div``;
