import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Cover.module.css';

interface Props {
    title: string
    frontCoverImage: string
    _id: string
}

const Cover: React.FC<Props> = (props) => {
    let { title, frontCoverImage, _id } = props;
    return (
        <Link to={
            `/${_id}`
        } className={classes.Cover}>
            <img src={frontCoverImage} alt={title} />
        </Link>
    )
}

export default Cover
