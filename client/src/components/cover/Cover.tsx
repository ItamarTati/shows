import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Cover.module.css';
//@ts-ignore
export default  (props) => {
        let { title, coverImage, _id } = props;
        return (
            <Link to={
                `/${_id}`
    } className={classes.Cover}>
                <img src={coverImage} alt={title} />
            </Link>
        )
}