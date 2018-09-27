import React from 'react';
import glamorous from 'glamorous';
import NotificationItem from './NotificationItem';
import { colors } from '../styles/constants';

const OuterWrapper = glamorous.div({
    position: 'absolute',
    top: '80%',
    right: '5%',
    width: '20rem',
    backgroundColor: colors.secondary,
    color: colors.primary,
});
const InnerWrapper = glamorous.div(({ show }) => ({
    overflow: 'hidden',
    border: show ? `1px solid ${colors.third}` : 0,
    maxHeight: show ? '50rem' : 0,
    transition: 'max-height 1s',
}));

const NotificationList = ({ notifications, show }) => {
    const mappedNotifications = notifications.map((notification) => (
        <NotificationItem key={`${notification.type}-${notification.post.id}`} notification={notification} />
    ));

    return (
        <OuterWrapper>
            <InnerWrapper show={show}>{mappedNotifications}</InnerWrapper>
        </OuterWrapper>
    );
};

export default NotificationList;