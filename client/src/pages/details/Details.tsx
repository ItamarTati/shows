import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import classes from './Details.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GET_SHOW = gql`
query Show($_id: ID!){
    show(_id: $_id) {
    backgroundImage
    backCoverImage  
    title
    author
    description
    trailer
    genres
    hasEnded
    numberOfEpisodes
    mangaChapters
    isDubbed
    animeReleaseDate
    
    }
  }
`;

export default function Details() {
  const { _id } = useParams()
  const { loading, data, error } = useQuery(GET_SHOW, {
    variables: { _id },
  });
  if (loading) return <Loading />;
  if (error) return <Redirect to='not-found' />;
  return DetailsContent();


  function DetailsContent() {
    let today = new Date();
    let showDay = new Date(data.show.animeReleaseDate);
    let date = today.getFullYear();
    let showDate = showDay.getFullYear();
    const background = require(`../../${data.show.backgroundImage}`)

    return (
      <div className={classes.Container} style={{
        'backgroundImage': `url(${background})`
      }}>
        <div className={classes.Content}>
          <h1>{data.show.title} by {data.show.author}</h1>
          <p className={classes.Subtitle}><strong>{data.show.description}</strong></p>
          <div className={classes.Video}>
            <video controls poster= {require(`../../${data.show.backCoverImage}`)}>
              <source src={data.show.trailer} type="video/mp4" />
            </video>
          </div>
          <ul className={classes.List}>
            <li>Genres: {data.show.genres.join(', ')}</li>
            {data.show.hasEnded === true ? <li>Number of Episodes: {data.show.numberOfEpisodes}</li> : <li>Number of Episodes: Ongoing with {data.show.numberOfEpisodes} Episodes</li>}

            <li>Number of Manga Volumes: {data.show.mangaChapters}</li>
            {data.show.isDubbed === true ? <li>English Dub: &#9989;</li> : <li>English Dub: &#x274C;</li>}
            <li>The Anime was Released {date - showDate} Years ago in {showDate}</li>
          </ul>

          <Link to='/'><button className={classes.Button}>Go to HomePage</button></Link>

        </div>
      </div>
    )


  }
}



