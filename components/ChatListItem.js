import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@material-ui/core';

import { getRecipientEmail } from '../utils/getRecipientEmail';
import { auth, db } from '../firebase';

const ChatListItem = ({ id, users }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);

    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const enterChat = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <>
            <ListItem button onClick={enterChat}>
                <ListItemAvatar>
                    <UserAvatar src={recipient && recipient?.photoURL} />
                </ListItemAvatar>
                <ListItemText>
                    <Typography noWrap>{recipientEmail}</Typography>
                </ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};

export default ChatListItem;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;
