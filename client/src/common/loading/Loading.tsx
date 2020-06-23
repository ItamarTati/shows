import React from 'react';
import classes from './Loading.module.css';

const  Loading: React.FC = () => {
    return (
        <div className={classes.Loading}>
            <div className={classes.Loader} />
            <p>Loading can take up 2 minutes becasue this website is using free hosting services</p>
        </div>
    )
}

export default Loading