import React from 'react'
import Cover from '../cover/Cover'
import Loading from '../../common/loading/Loading'
import classes from './Shows.module.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Header from '../../components/header/Header'


const GET_SHOWS = gql`
{
  shows {
    _id
    title
    frontCoverImage
  }
}
`;
interface Show {
  title: string
  frontCoverImage: string
  _id: string
}
interface Sort {
  title: string
}


const Shows: React.FC = () => {
  const { loading, data } = useQuery(GET_SHOWS);
  if (loading) return <Loading />;
  return (
    <div>
      <Header />
      <div id='shows' className={classes.Shows}>
        <h1 className={classes.Title}>Animes & Manga (アニメやマンガ)</h1>
        {
          data.shows.sort((showA: Sort, ShowB: Sort) => { 
            return showA.title.replace(/^The /, "") > ShowB.title.replace(/^The /, "") ? 1 : -1 
          }).map((show: Show) => {
            return (
              <Cover
                frontCoverImage={show.frontCoverImage} title={show.title} _id={show._id} />
            );
          })
        }
      </div>
    </div>
  );
}


export default Shows




