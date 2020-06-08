import React, {useState, useEffect} from 'react'
import Cover from '../cover/Cover'
import Loading from '../../common/loading/Loading'


export default () => {
    const [shows, setShows] = useState<string[]>([] as string[]);
    const url = "/shows"; 
    useEffect(() => {
            fetch(url) 
            .then(response => response.json())
            .then(shows => setShows(shows))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }, []);
    
    return (
            <div id='shows'>
                <h1>Animes & Manga (アニメやマンガ)</h1>
                {
                shows.length > 0 ?
                    shows.map(show => {
                        return (
 // @ts-ignore
                            <Cover coverImage={show.coverImage} title={show.title} _id={show._id} />
                        );
                    }) :
                    <Loading />
            }
            </div>
        );
}


