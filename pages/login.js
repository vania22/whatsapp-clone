import Head from 'next/head';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider);
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
                <Button variant='outlined' onClick={signIn}>
                    Sign in with Google
                </Button>
            </LoginContainer>
        </Container>
    );
};
export default Login;

const Container = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;
