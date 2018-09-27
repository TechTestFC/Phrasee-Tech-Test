import React from 'react';
import glamorous from 'glamorous';
import CenterDiv from '../common/CenterDiv';
import avatar from '../assets/avatar.png';
import { extractDisplayInformations } from './utils/notification-utils';

const Wrapper = glamorous.div({
    width: '100%',
    padding: '.5rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    cursor: 'pointer',
    transition: 'background-color .5s',
    ' &:hover': {
        backgroundColor: '#4267b247',
    },
});
const Img = glamorous.img({
    height: '3rem',
    width: '3rem',
});
const InnerWrapper = glamorous.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: '.5rem',
    overflow: 'hidden',
});
const Title = glamorous.h5({
    margin: 0,
    fontSize: '10px',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
});
const Content = glamorous.span({
    fontSize: '8px',
    color: 'black',
    marginTop: '.2rem',
});

const NotificationItem = ({ notification }) => {
    const { title, content } = extractDisplayInformations(notification);
    return (
        <Wrapper>
            <CenterDiv>
                <Img src={avatar} />
            </CenterDiv>
            <InnerWrapper>
                <Title>{title}</Title>
                <Content>{content}</Content>
            </InnerWrapper>
        </Wrapper>
    );
};

export default NotificationItem;