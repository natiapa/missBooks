
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemove }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <button onClick={() => onRemove(book.id)}>x</button>
                    <BookPreview book={book} />
                </li>
            )}
        </ul>
    </section>
}