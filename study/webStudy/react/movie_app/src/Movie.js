import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';


// class Movie extends Component{
//     static propType= {
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired,
//     }  
//     render(){
//         return(
//             <div>
//                 <MoviePoster poster={this.props.poster}/>
//                 <h1>{this.props.title}</h1>
//             </div> 
//         );
//     }
// }

// class MoviePoster extends Component{
//     static propType={
//         poster:PropTypes.string.isRequired,
//     }
//     render(){
//         return(
//             <img src={this.props.poster} alt = "Movie Poster" />
//         );
//     }
// }


//functional component() - 라이프싸이클도 사용하지 않고, state도 사용하지 않을때. 코드가 단순화 됨.
function Movie({title,poster}){
    return(
        <div>
            <MoviePoster poster={poster}/>
            <h1>{title}</h1>
        </div> 
    )
}

function MoviePoster({poster}){
    return (
        <img src={poster} alt = "Movie Poster"/>
    )
}

Movie.prototype = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
}

MoviePoster.prototype ={
    poster: PropTypes.number.isRequired
}

export default Movie;


