
const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

import { BookList } from '/../cmps/BookList.jsx'


export function BookIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
    }, [])
    
    function removeCar(bookId) {
        console.log(bookId)
        bookService.remove(bookId)
                .then(()=> setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    return (
        <section>
            <h1>Books</h1>
            <BookList books={books} onRemove={removeCar} />
        </section>
    )
}
