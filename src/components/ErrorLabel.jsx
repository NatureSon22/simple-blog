import "../css/error-label.css"

const ErrorLabel = ({ active, label }) => {
    return (
        <div className={`error-label ${active ? 'active' : '' } `}>
            <p>{label}</p>
        </div>
    )
}

export default ErrorLabel