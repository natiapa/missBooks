const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

   useEffect( () => {
    if(!params.bookId) return

    bookService.get(params.bookId)
        .then(setBook)
   }, [])

    function onSave(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => navigate('/book'))
            .catch(()=> {
                alert('couldnt save')
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

        console.log("prop", prop)
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
        <h1>BookEdit</h1>
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