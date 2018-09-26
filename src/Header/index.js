import React from 'react';
import glamorous from 'glamorous';
import { colors } from '../styles/constants';
import Logo from './Logo';
import NotificationFeed from './NotificationFeed';

const Wrapper = glamorous.header({
    backgroundColor: colors.primary,
    color: colors.secondary,
    minHeight: '2rem',
    padding: '.2rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
});

const Header = () => (
    <Wrapper>
        <Logo />
        <p>Phrasee Tech Test</p>
        <NotificationFeed />
    </Wrapper>
);

export default Header;