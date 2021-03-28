import styled from 'styled-components';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ListItem, ListItemText } from '@material-ui/core';

const Message = ({ user, message }) => {
    const [loggedInUser] = useAuthState(auth);
    const TypeOfMessage = user === loggedInUser.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>
                <ListItemText
                    primary={message.message}
                    secondary={message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                />
            </TypeOfMessage>
        </Container>
    );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled(ListItem)`
    &&& {
        min-width: 60px;
        max-width: 45%;
        width: fit-content;
        text-align: right;
        margin: 10px;
        position: relative;
        border-radius: 8px;
    }
`;

const Sender = styled(MessageElement)`
    &&& {
        margin-left: auto;
        background-color: #dcf8c6;
    }
`;

const Reciever = styled(MessageElement)`
    &&& {
        text-align: left;
        background-color: whitesmoke;
    }
`;
