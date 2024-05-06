import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookFilter() {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterBy(prevFilterBy =>({...prevFilterBy , [name]:value}))

        console.log('target', target.value)
    }

    return (
        <section className="book-filter">
            <h3>Filter</h3>
            <input onChange={handleChange} name='txt' value={filterBy.txt} type="text" placeholder="Title" />
            <input onChange={handleChange} name='price' value={filterBy.price} type="number" placeholder="Price" />
        </section>
    )
}

