import React from 'react';
import glamorous from 'glamorous';
import notification from '../assets/notification.png';
import CenterDiv from '../common/CenterDiv';

const Img = glamorous.img({
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
})
const NotificationFeed = () => (
    <CenterDiv>
        <Img src={notification} />
    </CenterDiv>
);

export default NotificationFeed;