import React from 'react';
import classes from './Header.module.css';

const BackgroundVideo: React.FC = () => {
    const videoSource = "https://www.dropbox.com/s/fr12rmq16ll040i/Anime%20Mix%20-%20Legends%20Never%20Die%20%5BAMV%5D.mp4?raw=1"
    const imageSource = "https://www.dropbox.com/s/1756ubrsibsg6f6/profilepic.png?raw=1"
    return (
        <div className={classes.Container} >
            <video
                autoPlay
                loop
                muted
                className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1>Welcome to the World of Anime & Manga</h1>
                    <p>A World of Great Stories & Beautiful Beyond your Wildest Dreams</p>
                    <a href="#shows"><button type="button" className="btn btn-outline-dark">View some Animes & Manga</button></a>
                    <img
                        src={imageSource}
                        alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo

