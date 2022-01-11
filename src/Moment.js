import React from 'react';
import { useParams } from 'react-router';

export function Moment() {
    let imageDate = useParams().date;
    console.log(imageDate)
    if (imageDate !== "2021-03-18" && imageDate !== "2021-03-19" && imageDate !== "2021-03-20") {
        return (
            <div className="visuals holdcenter">
                <h1 className="mb">Moments</h1>
                <h2 className="h4">You don't have any picture for today!</h2>
            </div>
        );
    }
    let imagePath = "../img/" + imageDate + ".jpg";
    console.log(imagePath)

    return (
        <div className="visuals holdcenter">
            <h1 className="mb">Moments</h1>
            <img src={imagePath} alt="moment image" className="mb"/>
            <h2 className="h5">{imageDate}</h2>
        </div>
    );
}

export default Moment;