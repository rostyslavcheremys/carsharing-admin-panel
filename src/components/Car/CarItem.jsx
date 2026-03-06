export const CarItem = ({ label, value }) => {
    return (
        <div className="car-item">
            <span className="car-item__label">{label}</span>
            <span className="car-item__value">{value}</span>
        </div>
    );
}