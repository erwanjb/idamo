import './App.css';
import React, { useState, useEffect } from 'react';
import useApi from './hooks/useApi';

const App = () => {

    const [goods, setGoods] = useState(null);
    const api = useApi();

    useEffect(() => {
        const start = async () => {
            const response = await api.get('/api/goods');
            setGoods(response.data);
        }
        start();
    }, []);

    return (
        <div className="body">
            <h1>Liste des biens d'Idamo</h1>

            { goods ? goods.map((good, ind) => {
                return (<>
                    <h2>Appartement {ind + 1}</h2>

                    <div className="house" key={ind}>

                        {Object.keys(good).map((key, index) => {
                            return (
                                good[key] && good[key] !== '0' && index !== 0 ? <div className="item" key={index}>
                                    <span className="full">{key} : </span>
                                    {key === 'images' ?
                                        <div className="cnt_img">
                                            {good[key].map((image, index2) => {
                                                return (
                                                    <img className="img" key={index + '_' + index2} src={image} />
                                                );
                                            })}
                                        </div> :
                                        (key === 'chauffages' || key === 'climatisations') ?
                                            (good[key] ? good[key].map((smthg, index2) => {
                                                return (
                                                    <span key={index + '_' + index2}>
                                                        {good[smthg]}
                                                    </span>
                                                );
                                            }) : null) :
                                            (key === 'visite virtuelle' && good[key]) ? 
                                            <iframe className="img" src={"https://www.youtube.com/embed/" + good[key].slice(-11)} ></iframe> :
                                            <span>
                                                {good[key]}
                                            </span>
                                    }
                                </div> : null
                            );
                        })}

                    </div>
                </>)
            }) : null}
        </div>

    );
}

export default App;