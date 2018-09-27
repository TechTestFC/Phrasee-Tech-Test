import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotificationFeed, { NotificationCount, ClickableWrapper } from '../NotificationFeed';
import NotificationList from '../NotificationList';

configure({ adapter: new Adapter() });

describe('<NotificationFeed />', () => {
    const jsonFnPromiseResolveData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const jsonFnPromise = new Promise((resolve) => {
        resolve(jsonFnPromiseResolveData)
    });
    const jsonFn = jest.fn().mockImplementation(() => jsonFnPromise);
    const fetchFnPromise = new Promise((resolve) => {
        resolve({ json: jsonFn })
    });
    const fetchFn = jest.fn().mockImplementation(() => fetchFnPromise);
    global.fetch = fetchFn;

    beforeEach(() => {
        jsonFn.mockClear();
        fetchFn.mockClear();
    });

    it('should mount without crashing', async () => {
        const component = shallow(<NotificationFeed />);
        
        // calls fetch
        expect(fetchFn).toHaveBeenCalledTimes(1);
        expect(fetchFn).toHaveBeenLastCalledWith('http://www.mocky.io/v2/5b4315f12e00004c002230c3');
        await fetchFnPromise;
        
        // then parses the response
        expect(jsonFn).toHaveBeenCalledTimes(1);
        await jsonFnPromise;

        // sets state using fetch response
        const mappedNotifications = jsonFnPromiseResolveData.map((notification) => ({
            ...notification, seen: false
        }));
        expect(component.state().notifications).toEqual(mappedNotifications);

        // passes it to notification list
        const notificationList = component.find(NotificationList);
        expect(notificationList.length).toBe(1);
        expect(notificationList.props().notifications).toEqual(mappedNotifications);
        expect(notificationList.props().show).toEqual(false);

        // and displays a notification count
        const notificationCount = component.find(NotificationCount);
        expect(notificationCount.length).toBe(1);
    });

    it('should display / hide the notifications on clicking', async () => {
        const component = shallow(<NotificationFeed />);
        await fetchFnPromise;
        await jsonFnPromise;

        // click!
        component.find(ClickableWrapper).props().onClick();

        // should set all notifications as seen
        const mappedNotifications = jsonFnPromiseResolveData.map((notification) => ({
            ...notification, seen: true
        }));
        expect(component.state().notifications).toEqual(mappedNotifications);

        // therefore, should hide the notification count
        expect(component.find(NotificationCount).length).toBe(0);

        // and show the notification list
        expect(component.find(NotificationList).props().show).toBe(true);

        // click again!
        component.find(ClickableWrapper).props().onClick();

        // should hide the notification list
        expect(component.find(NotificationList).props().show).toBe(false);
    });
});