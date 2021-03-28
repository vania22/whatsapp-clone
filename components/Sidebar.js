import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Avatar, IconButton, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { auth, db } from '../firebase';
import StartChat from './StartChat';
import ChatListItem from './ChatListItem';

const Sidebar = () => {
    const [startChatInputVisible, setStartChatInputVisible] = useState(false);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = (value) => {
        if (chatAlreadyExists(value)) return;

        db.collection('chats').add({
            users: [user.email, value],
        });
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0);

    return (
        <Container>
            <Header>
                <UserAvatar src={auth.currentUser.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={() => setContextMenuVisible((prev) => !prev)} style={{ position: 'relative' }}>
                        <MoreVertIcon />
                        {contextMenuVisible && (
                            <ContextMenu>
                                <ListItem button onClick={() => auth.signOut()}>
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Logout' />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='My Profile' />
                                </ListItem>
                            </ContextMenu>
                        )}
                    </IconButton>
                </IconsContainer>
            </Header>
            <Divider />
            <Search>
                <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                <SearchInput placeholder='Search in chats' />
            </Search>
            <Divider />
            {startChatInputVisible ? (
                <StartChat setStartChatInputVisible={setStartChatInputVisible} createChat={createChat} />
            ) : (
                <SidebarButton fullWidth onClick={() => setStartChatInputVisible(true)}>
                    Start a new chat
                </SidebarButton>
            )}
            <Divider />
            {/* List of chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <ChatListItem key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    width: 300px;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const ContextMenu = styled(List)`
    &&& {
        position: absolute;
        z-index: 999;
        left: 64px;
        top: -16px;
        background-color: whitesmoke;
        min-width: 180px;
    }
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    padding: 5px 15px;
`;

const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    outline-width: 0;
    height: 35px;
    font-size: 16px;
`;

const SidebarButton = styled(Button)`
    &&& {
        height: 46px;
        border-radius: 0;
        animation: slidein 1s;
    }

    @keyframes slidein {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;
