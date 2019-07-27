import React from 'react';
import './App.css';
import { getData } from './services/Data.service';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isError: false
    }
  }

  componentDidMount() {
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    getData(todosUrl)
      .then(
        result => {
          this.setState({
            isLoaded: true,
            isError: false,
            items: result.data || []
          });
        }
      ).catch(
        () => {
          this.setState({
            isLoaded: false,
            isError: true,
            items: []
          });
        }
      );
  }

  render() {
    const { isLoaded, isError, items } = this.state;
    let errorMessage = null;
    let spinner = null;

    if (!isLoaded && !isError) {
      spinner = (
        <div className='text-center mt-3 mb-3'>
          <span>Loading...</span>
        </div>
      )
    }
    if (isError) {
      errorMessage = (
        <p className='text-danger text-center'>An error occured. Unable to fetch todo items.</p>
      )
    }

    return (
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-2'>
              <nav>
                <h1>Todo list</h1>
              </nav>
            </div>
            <div className='col-md-12 mt-2 mb-4'>
              {spinner}
              {errorMessage}
              <ul className='list-group'>
                {items.map(
                  item => (
                    <li className='list-group-item' key={item.id}>{item.title}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
