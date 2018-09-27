import React from 'react';
import glamorous from 'glamorous';
import NotificationList from './NotificationList';
import notification from '../assets/notification.png';
import CenterDiv from '../common/CenterDiv';

export const ClickableWrapper = glamorous(CenterDiv)({
    position: 'relative',
});
const Img = glamorous.img({
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    position: 'relative',
});
export const NotificationCount = glamorous.span({
    position: 'absolute',
    left: '75%',
    backgroundColor: 'red',
    border: '1px solid red',
    borderRadius: '5px',
})

class NotificationFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            showNotifications: false,
        };
    }

    async componentDidMount() {
        const response = await fetch('http://www.mocky.io/v2/5b4315f12e00004c002230c3');
        const data = await response.json();
        const notifications = data.map((dataItem) => ({ ...dataItem, seen: false }));
        this.setState({ notifications });
    }

    toggleNotifications = () => {
        this.setState((state) => {
            const showNotifications = !state.showNotifications;
            const notifications = state.notifications
                .map((notification) => ({ ...notification, seen: true }));

            return {notifications, showNotifications };
        });
    }

    render() {
        const notificationCount = this.state.notifications.filter((notification) => !notification.seen).length;
        return (
            <ClickableWrapper onClick={this.toggleNotifications}>
                <Img src={notification} />
                {notificationCount > 0 && <NotificationCount>{notificationCount}</NotificationCount>}
                <NotificationList notifications={this.state.notifications} show={this.state.showNotifications} />
            </ClickableWrapper>
        );
    }
}

export default NotificationFeed;