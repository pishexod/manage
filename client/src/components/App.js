import React, {useState, useEffect} from 'react';
import {Navbar, Button, Text} from '@nextui-org/react';
import {Layout} from './Layout.js';
import {AcmeLogo} from './AcmeLogo.js';
import {styled} from '@nextui-org/react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../css/style.css'

const StyledNavbar = styled(Navbar, ({theme, isBordered}) => ({
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(182,24,24,0.8)',
    zIndex: theme.zIndex.fixed,
    ...(isBordered && {
        border: '1px solid white',
    }),
    fontFamily:'Arial, sans-serif',
    fontSize: "30px",
    transition: 'transform 0.3s ease',
    transform: 'translateY(0)',
    transformOrigin: 'top',
    boxShadow: '0 2px 4px rgba(182,24,24,0.8)',
}));

export default function App() {
    const isDark = true;
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleNavLinkClick = (path) => {
        setActiveLink(path);
        navigate(path);
    };

    return (
        <Layout>
            <StyledNavbar
                isBordered={isDark}
                variant="floating"
                style={{
                    transform: scrollPosition > 0 ? 'translateY(-100%)' : 'translateY(0)',
                }}
            >
                <Navbar.Brand>
                    <AcmeLogo/>
                    <Text b color="inherit" hideIn="xs">
                        Фіз. підготовка
                    </Text>
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    <Navbar.Link
                        href="/"
                        isActive={activeLink === '/'}
                        onClick={(event) => {
                            event.preventDefault();
                            handleNavLinkClick('/');
                        }}
                    >
                        Головна
                    </Navbar.Link>

                    <Navbar.Link
                        href="/phys-preparation"
                        isActive={activeLink === '/phys-preparation'}
                        onClick={(event) => {
                            event.preventDefault();
                            handleNavLinkClick('/phys-preparation');
                        }}
                    >
                        Облік фізичної підготовленості
                    </Navbar.Link>
                    <Navbar.Link
                        href="/schedule-training"
                        isActive={activeLink === '/schedule-training'}
                        onClick={(event) => {
                            event.preventDefault();
                            handleNavLinkClick('/schedule-training');
                        }}
                    >
                        Розклад тренувань
                    </Navbar.Link>
                    <Navbar.Link
                        href="/statistics"
                        isActive={activeLink === '/statistics'}
                        onClick={(event) => {
                            event.preventDefault();
                            handleNavLinkClick('/statistics');
                        }}
                    >
                        Статистика
                    </Navbar.Link>
                    <Navbar.Link
                        href="/soldiers"
                        isActive={activeLink === '/soldiers'}
                        onClick={(event) => {
                            event.preventDefault();
                            handleNavLinkClick('/soldiers');
                        }}
                    >
                        Управління в/с
                    </Navbar.Link>
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Item>
                        <Button auto flat onClick={logout}>
                            Вийти
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </StyledNavbar>
        </Layout>
    );
}
