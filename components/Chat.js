import styled from 'styled-components';
import firebase from 'firebase';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, TextField } from '@material-ui/core';
import TimeAgo from 'timeago-react';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import { getRecipientEmail } from '../utils/getRecipientEmail';
import { auth, db } from '../firebase';

import Message from './Message';

const Chat = ({ chat, messages }) => {
    const [value, setValue] = useState('');
    const router = useRouter();

    const lastMessageRef = useRef();

    const [loggedInUser] = useAuthState(auth);

    const recipientEmail = getRecipientEmail(chat.users, loggedInUser);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const [messagesSnapshot] = useCollection(
        db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'),
    );

    const scrollToBottom = () => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const sendMessage = () => {
        db.collection('users').doc(loggedInUser.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true },
        );

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: value,
            user: loggedInUser.email,
            photoURL: loggedInUser.photoURL,
        });

        setValue('');
        scrollToBottom();
    };

    const RecipientLastSeen = () => {
        return (
            <span>
                Last seen: {recipient?.lastSeen ? <TimeAgo datetime={recipient.lastSeen.toDate()} /> : ' Unavailable'}
            </span>
        );
    };

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
                />
            ));
        } else {
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
            ));
        }
    };

    return (
        <Container>
            <Header>
                <ListItem style={{ maxWidth: '40%' }}>
                    <ListItemAvatar>
                        <UserAvatar src={recipient && recipient?.photoURL} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={recipientEmail}
                        secondary={<RecipientLastSeen />}
                        primaryTypographyProps={{ noWrap: true }}
                    />
                </ListItem>
                <IconsContainer>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessagesPlaceholder ref={lastMessageRef} />
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <TextField
                    fullWidth
                    variant='filled'
                    multiline
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <IconButton disabled={!value.trim()} onClick={sendMessage}>
                    <SendIcon />
                </IconButton>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </InputContainer>
        </Container>
    );
};

export default Chat;

const Container = styled.div`
    position: relative;
    height: 100vh;
`;

const Header = styled.div`
    position: sticky;
    z-index: 999;
    background-color: white;
    top: 0;
    height: 81px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const IconsContainer = styled.div``;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessagesPlaceholder = styled.div`
    margin-bottom: 60px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    position: sticky;
    z-index: 999;
    bottom: 0;
    width: 100%;
    background-color: white;

    & div.MuiFormControl-root {
        margin: 0 15px;
    }

    & svg {
        cursor: pointer;
    }
`;
