
const Categories = ({ setCategoryList }) => {

    const handleSelect = (e) => {
        const selectedCategory = e.target.value;
        setCategoryList(prev => { 
            let newList = [...prev];

            if(!newList.includes(selectedCategory)) {
                newList.push(selectedCategory);
            }

            return newList;
        });
    };

    return (
        <select className="categories" onChange={handleSelect} >
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="science">Science</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="sports">Sports</option>
            <option value="personal-finance">Personal Finance</option>
            <option value="news-politics">News and Politics</option>
            <option value="diy-crafts">DIY and Crafts</option>
            <option value="parenting">Parenting</option>
            <option value="environment">Environment</option>
        </select>
    )
}

export default Categories