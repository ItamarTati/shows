import React, {useState, useEffect} from 'react'
import Cover from '../cover/Cover'
import Loading from '../../common/loading/Loading'
import classes from './Shows.module.css';



export default () => {
    const [shows, setShows] = useState<string[]>([] as string[]);
    const url = "/shows"; 
    useEffect(() => {
            fetch(url) 
            .then(response => response.json())
                //@ts-ignore
            .then(shows => setShows(shows.sort(function(a, b){
                //@ts-ignore
                if(a.title < b.title) { return -1; }
                //@ts-ignore
                if(a.title > b.title) { return 1; }
                return 0;
        })))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }, []);
  
    return (
            <div id='shows' className={classes.Shows}>
                <h1 className={classes.Title}>Animes & Manga (アニメやマンガ)</h1>
    
                {
                shows.length > 0 ?
                    shows.map(show => {
                        return (
 // @ts-ignore
                        
                        <Cover 
                         // @ts-ignore
                        coverImage={show.coverImage} title={show.title} _id={show._id} />

                        );
                    }) :
                    <Loading />
            }
            </div>
        );
}


