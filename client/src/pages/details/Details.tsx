import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
// import './Details.css';
import classes from './Details.module.css';
import { useParams, useHistory } from 'react-router-dom';

export default function Details() {
    //@ts-ignore
    const { _id } = useParams()
    const history = useHistory()
    const url = "/shows/";
    const [show, setShow] = useState(Object)
    useEffect(() => {
        fetch(url + _id)
            .then(response => response.json())
            .then(show => setShow(show))
    }, []);

        // return !show._id ? <Loading /> : <div>James</div>;
            return show._id ?
                <DetailsContent/> :
                <Loading />;
        
   
        function DetailsContent( ) {
            // return (        
            //     <div style={{
            //         'backgroundImage': `url(${show.backgroundImage})`
            //     }}>
            //         <h1>{show.title}</h1>
            //         <h1>{show.author}</h1>
            //         <h1>{show.description}</h1>
            //         <h1>{show.genre}</h1>
            //         <h1>{show.releaseDate}</h1>
            //         <h1>{show.numberOfEpisodes}</h1>
            //         <h1>{show.movieNames}</h1>
            //         <h1>{show.isDubbed}</h1>
            //         <h1>{show.mangaChapters}</h1>
            //         <h1>{show.hasEnded}</h1>
            //     </div>
            // )
            return (
                <div className={classes.Container} style={{
                            'backgroundImage': `url(https://images7.alphacoders.com/677/677266.png)`
                        }}>
                <div className={classes.Content}>
                  <h1>{show.title} by {show.author}</h1>
                  <p className={classes.Subtitle}><strong>{show.description}</strong></p>
                  <div className={classes.Video}>
                    <video controls poster={show.backgroundImage}>
                    <source src={show.trailer} type="video/mp4"   />
                    </video>
                </div>
                    <li style={{
                            'textAlign': 'left',
                            'marginLeft': '7.5%',
                            'listStyleType': 'none'
                        }}>
                            <ul>Genres: {show.genre.join(', ')}</ul>
                            <ul>Number of Episodes: {show.numberOfEpisodes}</ul> 
                            <ul>Number of Manga Chapters: {show.mangaChapters}</ul>                         
                        </li>
                
                  <p><a className={classes.Button} onClick={() => history.goBack()} >Return to Previous Page</a></p>

                </div>
                </div>
            )
            
    
    }
}


