export const DetailsItem = ({ label, value }) => {
    return (
        <div className="details-item">
            <span className="details-item__label">{label}</span>
            <span className="details-item__value">{value}</span>
        </div>
    );
}