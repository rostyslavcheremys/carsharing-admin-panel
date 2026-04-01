export const InfoMessage = ({ message }) => {
    return (
        <div className="info-message">
            <p className="info-message__text">
                {message}
            </p>
        </div>
    );
}