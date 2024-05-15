const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()
    console.log('params edit', params)

    useEffect(() => {
        if (!params.bookId) return

        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                navigate('/book')
                showSuccessMsg('The book has been successfully added')
            })
            .catch(() => {
                showErrorMsg('There is a problem, the book was not added successfully')
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        if (prop === 'amount') {
            setBook(prevBook => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    [prop]: value
                }
            }))
        } else setBook(prevBook => ({ ...prevBook, [prop]: value }))
    }

    return <section className="book-edit">
        <h1>{params.bookId ? 'Edit Book' : 'Add Book'}</h1>
        <form onSubmit={onSave}>
            <label htmlFor="title">Title</label>
            <input
                onChange={handleChange} value={book.title}
                id="title" name="title"
                type="text" placeholder="book" />

            <label htmlFor="amount">Price</label>
            <input
                onChange={handleChange} value={book.listPrice.amount}
                id="amount" name="amount"
                type="number" placeholder="price" />

            <button>Save</button>
        </form>
    </section>
}