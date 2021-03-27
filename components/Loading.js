import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Loading = () => {
    return (
        <Container>
            <div>
                <Logo src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
                <CircularProgress size={220} style={{ color: '#4ccb5a' }} />
            </div>
        </Container>
    );
};

export default Loading;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`;

const Logo = styled.img`
    height: 120px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    position: absolute;
`;
