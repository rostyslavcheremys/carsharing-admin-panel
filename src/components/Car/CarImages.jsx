import { useState, useRef, useEffect } from "react";

import { ArrowBackIcon, ArrowForwardIcon } from "../../libs/mui-icons";

import { ActionIconButton, ImageItem } from "../../components";

export const CarImages = ({ images }) => {
    const sliderRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollLeft = () => {
        const el = sliderRef.current;
        if (!el) return;

        el.scrollBy({
            left: -el.clientWidth,
            behavior: "smooth",
        });
    }

    const scrollRight = () => {
        const el = sliderRef.current;
        if (!el) return;

        el.scrollBy({
            left: el.clientWidth,
            behavior: "smooth",
        });
    }

    const checkScroll = () => {
        const el = sliderRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(
            el.scrollLeft + el.clientWidth < el.scrollWidth
        );
    }

    useEffect(() => {
        checkScroll();
    }, [images]);

    return(
        <div className="car-images">
            <div className="car-images__container">
                <div className="car-images__wrapper">
                    <div
                        className="car-images__slider"
                        onScroll={checkScroll}
                        ref={sliderRef}
                    >
                        {images.map((item, index) => (
                            <ImageItem
                                key={index}
                                src={item}
                                alt={`image_${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="car-images__overlay">
                        <ActionIconButton
                            Icon={ArrowBackIcon}
                            className="car-images__button"
                            disabled={!canScrollLeft}
                            onClick={scrollLeft}
                        />

                        <ActionIconButton
                            Icon={ArrowForwardIcon}
                            className="car-images__button"
                            disabled={!canScrollRight}
                            onClick={scrollRight}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
}