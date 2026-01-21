import { useState } from "react";

import { ImageIcon } from "../../libs/mui-icons.js";

export const ImageCell = ({ src, alt }) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className="table__icon-container">
                <ImageIcon />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="table__image"
            onError={() => setHasError(true)}
        />
    );
};