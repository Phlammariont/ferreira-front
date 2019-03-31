import React from 'react';
import ReactDOM from 'react-dom';
import PriceList from './index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PriceList />, div);
    ReactDOM.unmountComponentAtNode(div);
});
