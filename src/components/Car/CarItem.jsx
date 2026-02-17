export const CarItem = ({ label, value }) => {
    return(
        <div className="car-item">
            <div className="car-item__label">{label} </div> {value}
        </div>
    );
}