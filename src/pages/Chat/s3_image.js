import React, { useState, useEffect } from 'react';
import { imgDownload } from "api";


const ImageWithLoading = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [base64Image, setBase64Image] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${imgDownload}?s3_path=${props.s3_path}`);
                const body = await response.json();
                setBase64Image(body.data)
                setIsLoading(false)

            } catch (error) {
                console.error('Error loading image:', error);
                setIsLoading(false);
            }
        };

        fetchImage();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="photo-img-loader animate-loader"></div>
            ) : (
                <img
                    style={{ maxWidth: '100%' }}
                    src={`data:image/jpeg;base64,${base64Image}`}
                    alt={`loaded`}
                />
            )}
        </div>
    );
};

export default ImageWithLoading;
