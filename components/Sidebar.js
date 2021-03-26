import styled from 'styled-components';
import { Avatar, IconButton, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

const Sidebar = () => {
    return (
        <Container>
            <Header>
                <UserAvatar />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                <SearchInput placeholder='Search in chats' />
            </Search>
            <SidebarButton fullWidth>Start a new chat</SidebarButton>
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    width: 300px;
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
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid whitesmoke;
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
        border-bottom: 1px solid whitesmoke;
        border-radius: 0;
    }
`;
