import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Cover.module.css';


interface Props {
    title: string
    frontCoverImage: string
    _id: string
}

const Cover: React.FC<Props> = (props) => {
    const { title, frontCoverImage, _id } = props;
    console.log(_id)

    return (
        <Link to={`/shows/${_id}`} className={classes.Cover}>
            <img src={`http://localhost:5173/src/${frontCoverImage}`} alt={title} />
        </Link>
    );
}

export default Cover;