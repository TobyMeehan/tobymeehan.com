import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SpinnerProps {
    className?: string
}

export default function Spinner({className = ""}: SpinnerProps) {
    return (
        <FontAwesomeIcon icon={faSpinner} className={`animate-spin ${className}`} />
    )
}