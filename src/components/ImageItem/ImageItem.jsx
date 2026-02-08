import { useState } from "react";

import { Loader } from "../../components";

export const ImageItem = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="image-item">

            {isLoading && (
                <div className="image-item__loader">
                    <Loader isLoading={true} />
                </div>
            )}

            <img
                className={`image-item__image ${isLoading ? 'image-item__image--loading' : ''}`}
                src={src}
                alt={alt}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}