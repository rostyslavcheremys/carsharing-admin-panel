import { useState, useRef, useEffect } from "react";
import { ImageItem } from "../ImageItem/ImageItem.jsx";

import { IconButton } from "../../libs/mui";
import { ArrowBackIcon, ArrowForwardIcon } from "../../libs/mui-icons";
import {ActionIconButton} from "../Buttons/ActionIconButton.jsx";

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
            <ActionIconButton
                Icon={ArrowBackIcon}
                className="car-images__button car-images__button--side"
                disabled={!canScrollLeft}
                onClick={scrollLeft}
            />

            <div className="car-images__container">
                <div className="car-images__slider" onScroll={checkScroll} ref={sliderRef}>
                    {images.map((item, index) => (
                        <ImageItem
                            key={index}
                            src={item}
                            alt={`image_${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="car-images__buttons">
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

            <ActionIconButton
                Icon={ArrowForwardIcon}
                className="car-images__button car-images__button--side"
                disabled={!canScrollRight}
                onClick={scrollRight}
            />
        </div>
    );
}