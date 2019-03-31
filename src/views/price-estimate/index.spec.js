import React from 'react';
import ReactDOM from 'react-dom';
import PriceEstimation from './index';

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PriceEstimation />, div)
    ReactDOM.unmountComponentAtNode(div)
});
