
const { useState, useEffect } = React

export function BookFilter({filterBy, onFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect (() => {
        onFilter(filterByToEdit)
    },[filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy =>({...prevFilterBy , [name]:value}))

        console.log('target', target.value)
    }

    return (
        <section className="book-filter">
            <h3>Filter</h3>
            <input onChange={handleChange} name='txt' value={filterByToEdit.txt} type="text" placeholder="Title" />
            <input onChange={handleChange} name='price' value={filterByToEdit.price} type="number" placeholder="Price" />
        </section>
    )
}

