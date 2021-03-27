import styled from 'styled-components';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@material-ui/core';

const Chat = ({ id, users }) => {
    return (
        <>
            <ListItem button>
                <ListItemAvatar>
                    <UserAvatar />
                </ListItemAvatar>
                <ListItemText>
                    <Typography noWrap>{users[1]}</Typography>
                </ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};

export default Chat;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;
