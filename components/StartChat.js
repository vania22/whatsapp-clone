import { useRef, useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import { auth } from '../firebase';

const StartChatInput = ({ setStartChatInputVisible, createChat }) => {
    const ref = useRef(null);
    const [error, setError] = useState(false);
    const [value, setValue] = useState('');

    // onClick event listener to remove StartChatInput component on outter click
    useEffect(() => {
        const removeOnOutterClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setStartChatInputVisible(false);
            }
        };

        document.addEventListener('click', removeOnOutterClick);

        return () => {
            document.removeEventListener('click', removeOnOutterClick);
        };
    }, []);

    const onClick = () => {
        if (!value.trim()) return setError(true);
        if (!EmailValidator.validate(value)) return setError(true);
        if (value.trim() === auth.currentUser.email) return setError(true);
        createChat(value);
        setStartChatInputVisible(false);
    };

    return (
        <Container ref={ref}>
            <Input
                fullWidth
                placeholder='Please type in user email address'
                type='email'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={error}
                helperText={error ? 'Make sure you entered correct email address' : ''}
            />
            <StartButton fullWidth onClick={onClick}>
                Start
            </StartButton>
        </Container>
    );
};

export default StartChatInput;

const Container = styled.div`
    animation: slidein 1s;
    @keyframes slidein {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

const Input = styled(TextField)`
    &&& {
        height: 46px;
        padding: 15px;
    }
`;

const StartButton = styled(Button)`
    &&& {
        height: 46px;
        border-radius: 0;
        background-color: #4ccb5a;
        color: white;
        margin-top: 25px;
    }

    :hover {
        opacity: 0.9;
    }
`;
