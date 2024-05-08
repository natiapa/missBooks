const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemove }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button onClick={() => onRemove(book.id)}>x</button>
                    <Link to="book/details"><button>Details</button></Link>
                </li>
            )}
        </ul>
    </section>
}