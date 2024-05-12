const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


import { bookService } from '../services/book.service.js'



export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('couldnt get book!')
                navigate('/car')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    if (isLoading) return <h3>Loading...</h3>

    return <article className='book-details'>
        <h3>{book.title}</h3>
        <p>price: {book.listPrice.amount}</p>
        <p>Currency: {book.listPrice.currencyCode}</p>
        <p>Language: {book.language}</p>
        <p>Categoric: {book.categories}</p>
        <p>Authors: {book.authors}</p>
        <p>Description: {book.description}</p>
        <p>Reviews:</p>
        <ul>
            {book.reviews.map((review, index) => (
                <li key={index}>
                    <p>Fullname: {review.fullname}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Read At: {review.readAt}</p>
                </li>
            ))}
        </ul>

        <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
        <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
        <Link to={`/book/${book.id}/review`}><button>Add Review</button></Link>
        <Link to="/book"><button>x</button></Link>

    </article>
}