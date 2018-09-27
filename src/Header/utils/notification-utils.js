
export const getNamesFromEvents = (events) => {
    if (events.length === 1) {
        return events[0].name || 'Someone';
    }

    if (events.length === 2) {
        return `${events[0].name} and ${events[1].name}`;
    }
    
    const numberOfOtherPeople = events.length - 2;
    const singularOrPlural = numberOfOtherPeople === 1 ? 'other' : 'others';
    return `${events[0].name}, ${events[1].name} and ${numberOfOtherPeople} ${singularOrPlural}`;
} 
export const getCommentTextObject = (notification) => {
    return {
        names: getNamesFromEvents(notification.comments),
        action: 'commented',
    }
};
export const getLikeTextObject = (notification) => {
    return {
        names: getNamesFromEvents(notification.likes),
        action: 'liked',
    };
};
export const extractDisplayInformations = (notification) => {
    const builder = notification.type === 'Like'
        ? getLikeTextObject(notification)
        : getCommentTextObject(notification);

    const content = `${builder.names} ${builder.action} your post`;
    return {
        title: notification.post.title,
        content,
    };
};