import React, {useEffect, useState} from 'react';
import axios from 'axios';
const App: React.FC = () => {
    const [shows, setShows] = useState<any>([] as any);
    const url = "/shows"; 
    useEffect(() => {
            fetch(url) 
            .then(response => response.json())
            .then(shows => console.log(shows))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }, []);
    
    return (
        <div>
        </div>
    );
}


export default App;