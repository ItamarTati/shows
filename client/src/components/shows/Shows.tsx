import React, {useState, useEffect} from 'react'
import Cover from '../cover/Cover'
import Loading from '../../common/loading/Loading'
import classes from './Shows.module.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_SHOWS = gql`
{
  shows {
    _id
    title
    frontCoverImage
  }
}
`;

export default () => {
    const { loading, error, data } = useQuery(GET_SHOWS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (       
            <div id='shows' className={classes.Shows}>
                <h1 className={classes.Title}>Animes & Manga (アニメやマンガ)</h1>   
                {
                data.shows.length > 0 ?
//@ts-ignore
                data.shows.map(show => {
                        return (
                        <Cover 
                        coverImage={show.frontCoverImage} title={show.title} _id={show._id} />
                        );
                    }) :
                    <Loading />
            }
            </div>
        );
}


