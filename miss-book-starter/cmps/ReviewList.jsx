const { useState } = React
const {  useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'

export function ReviewList({ bookId }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const navigate = useNavigate()


    function onSave(ev) {
        ev.preventDefault();
        bookService.addReview(bookId, review)
            .then(() => navigate(`/book/${bookId}`))
                       .catch(() => {
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
        }

        setReview(prevReview => ({ ...prevReview, [prop]: value }))

    }


    return <section className="book-review">
        <h1>{'book-review'}</h1>
        <form onSubmit={onSave}>
            <label htmlFor="fullname">FullName:</label>
            <input
                onChange={handleChange}
                value={review.fullname}
                id="fullname"
                name="fullname"
                type="text"
                placeholder="FullName" />

            <label htmlFor="rating">Rate this:</label>
            <input
                onChange={handleChange}
                type="range"
                name="rating"
                value={review.rating}
                id="rating"
                min="0" max="5"
                low="1" high="5" optimum="5" />
            <span>{review.rating}</span>


            <label htmlFor="date"></label>
            <input onChange={handleChange} type="date" id="readAt" name="readAt"
                value={review.readAt} />

            <button>Save</button>
        </form>
    </section>
}