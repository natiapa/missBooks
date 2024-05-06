
const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

import { BookList } from '/../cmps/BookList.jsx'
import { BookFilter } from '/../cmps/BookFilter.jsx'


export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])
    
    function removeCar(bookId) {
        console.log(bookId)
        bookService.remove(bookId)
                .then(()=> setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    return (
        <section>
            <h1>Books</h1>

            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <BookList books={books} onRemove={removeCar} />
        </section>
    )
}
