import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Api', ()=> {

  beforeEach(()=>{
    window.fetch = jest.fn().mockImplementation((e) => {
      const response = {
        json: () => []
      }
      return Promise.resolve(response);
    });
  });

  it('renders without crashing', () => {
     const div = document.createElement('div');
     ReactDOM.render(<App />, div);
  });
});
