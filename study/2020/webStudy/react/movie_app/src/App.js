import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'; 

class App extends Component {

  // react lifecicle
  // Render : componentWillMount() > render() > componentDidMount()

  // componentWillMount()
    // 첫번째로 실행
    // 보통은 api작업 요청

  // render()
    // 두번째로 실행

  // componentDidMount()
    // 세번째로 실행


  // Update : componentWillReceiveProps() > shouldComponentUpdate()==true > componentWillUpdate() > render() > componentDidUpdate()
  
  //-----------------------------------------------------------------------------

  // state가 update 될때마다 render()가 실행이 된다.
  // 직접적인 접근은 금물
  // setState를 통해 접근이 가능.
  state={
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        movies : [
          {
            title:"matrix",
            poster:"https://upload.wikimedia.org/wikipedia/ko/thumb/2/26/%EB%A7%A4%ED%8A%B8%EB%A6%AD%EC%8A%A4_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EB%A7%A4%ED%8A%B8%EB%A6%AD%EC%8A%A4_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
          },
          {
            title:"hello",
            poster:"https://cremazer.github.io/assets/img/java/20140916/java_hello_world.jpg"
          },
          {
            title:"007",
            poster:"https://upload.wikimedia.org/wikipedia/ko/thumb/a/ad/007_%EC%8A%A4%ED%8E%99%ED%84%B0.jpg/220px-007_%EC%8A%A4%ED%8E%99%ED%84%B0.jpg"
          },
          {
            title:"Star Wars",
            poster:"https://lumiere-a.akamaihd.net/v1/images/star-wars-the-rise-of-skywalker-theatrical-poster-1000_ebc74357.jpeg?region=0%2C0%2C891%2C1372"
          },
          {
            title:"trains",
            poster:"https://upload.wikimedia.org/wikipedia/ko/thumb/2/26/%EB%A7%A4%ED%8A%B8%EB%A6%AD%EC%8A%A4_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EB%A7%A4%ED%8A%B8%EB%A6%AD%EC%8A%A4_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
          }
        ]
      })
    }, 3000)
  }

  _renderMovies=()=>{
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index}/>
    })
    return movies;
  }

  render(){
    // 두번째로 실행
    // 데이터를 
    return(
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading..."}
      </div>
    );
  }
}

export default App;