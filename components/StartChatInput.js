import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StartChatInput = ({ value, onChange, setStartChatInputVisible }) => {
    const ref = useRef(null);

    useEffect(() => {
        const removeOnOutterClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setStartChatInputVisible(false);
            }
        };

        document.addEventListener('click', removeOnOutterClick);

        return () => {
            onChange('');
            document.removeEventListener('click', removeOnOutterClick);
        };
    }, []);

    return (
        <Input
            ref={ref}
            fullWidth
            placeholder='Please type in user email address'
            type='email'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            helperText='Make sure you entered correct email address'
        />
    );
};

export default StartChatInput;

const Input = styled(TextField)`
    &&& {
        height: 46px;
        padding: 15px;
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
