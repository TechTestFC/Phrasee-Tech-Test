import {
    getNamesFromEvents,
    getCommentTextObject,
    getLikeTextObject,
    extractDisplayInformations,
} from '../notification-utils';

describe('getNamesFromEvents', () => {
    it('should default to Someone', () => {
        expect(getNamesFromEvents([{}])).toBe('Someone');
    });
    it('should work with one name', () => {
        const events = [{ name: 'Arnold' }];
        expect(getNamesFromEvents(events)).toBe('Arnold');
    });
    it('should work with two names', () => {
        const events = [{ name: 'Arnold' }, { name: 'Silvester' }];
        expect(getNamesFromEvents(events)).toBe('Arnold and Silvester');
    });
    it('should work with three names', () => {
        const events = [{ name: 'Arnold' }, { name: 'Silvester' }, { name: 'Chuck' }];
        expect(getNamesFromEvents(events)).toBe('Arnold, Silvester and 1 other');
    });
    it('should work with more names', () => {
        const events = [{ name: 'Arnold' }, { name: 'Silvester' }, { name: 'Chuck' }, { name: 'Bruce' }];
        expect(getNamesFromEvents(events)).toBe('Arnold, Silvester and 2 others');
    });
});

describe('getCommentTextObject', () => {
    it('should return the right object', () => {
        const notification = {
            comments: [{}],
        };
        const expected = {
            names: 'Someone',
            action: 'commented',
        };
        expect(getCommentTextObject(notification)).toEqual(expected);
    });
});

describe('getLikeTextObject', () => {
    it('should return the right object', () => {
        const notification = {
            likes: [{}],
        };
        const expected = {
            names: 'Someone',
            action: 'liked',
        };
        expect(getLikeTextObject(notification)).toEqual(expected);
    });
});

describe('getLikeTextObject', () => {
    it('should return the right like object', () => {
        const notification = {
            type: 'Like',
            likes: [{}],
            post: { title: 'Title!' },
        };
        const expected = {
            title: 'Title!',
            content: 'Someone liked your post',
        };
        expect(extractDisplayInformations(notification)).toEqual(expected);
    });
    it('should return the right comment object', () => {
        const notification = {
            type: 'Comment',
            comments: [{}],
            post: { title: 'Title!' },
        };
        const expected = {
            title: 'Title!',
            content: 'Someone commented your post',
        };
        expect(extractDisplayInformations(notification)).toEqual(expected);
    });
});