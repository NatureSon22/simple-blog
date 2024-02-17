import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CategoryContainer = ({ category, setCategoryList }) => {

    const removeCategory = () => {
        setCategoryList((prev) => {
            return prev.filter(el => el !== category)
        })
    }

    return (
        <div className="category-contain flex">
            <p>{category}</p>
            <button onClick={removeCategory}>
                <FontAwesomeIcon icon={faXmark} ></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default CategoryContainer