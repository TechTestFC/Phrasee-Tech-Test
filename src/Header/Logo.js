import React from 'react';
import glamorous from 'glamorous';
import logo from '../assets/logo.png';
import CenterDiv from '../common/CenterDiv';

const Img = glamorous.img({
    width: '2rem',
    height: '2rem',
});
const Logo = () => (
    <CenterDiv>
        <Img src={logo} />
    </CenterDiv>
);

export default Logo;