import React from 'react'


const Project = ({image, title, description}) => {
    return (
        <>
            <div>
                <div>
                <img src={image} alt="" />
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>Description: {description}</p>
                </div>

            </div>
        </>
    )
}

export default Project