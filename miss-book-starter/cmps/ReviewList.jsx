
const { useState, useRef } = React
const { useNavigate } = ReactRouter

import { TextboxRating } from "./TextboxRating.jsx"

import { RateBySelect } from "./dynamic-inputs/RateBySelect.jsx"
import { RateByNumInput } from "./dynamic-inputs/RateByNumInput.jsx"
import { RateByStars } from "./dynamic-inputs/RateByStars.jsx"


import { bookService } from '../services/book.service.js'

export function ReviewList({ bookId }) {

    const navigate = useNavigate()
    const [cmpType, setCmpType] = useState('stars')
    const [review, setReview] = useState({
        fullname: '',
        readAt: new Date().toISOString().slice(0, 10),
        txt: '',
        rating: 0
    })


    function onSaveBook(ev) {
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

            case 'checkbox':
                value = target.checked
                break;
        }
        setReview((prevReview) => ({ ...prevReview, [prop]: value }))
    }

    function onSetRating(newRating) {
        setReview(prevStyle => ({ ...prevStyle, ...newRating }))
    }

    function onchangeCmpType(selectedType) {
        setCmpType(selectedType)
    }

    return <section className="book-review">
        <form onSubmit={onSaveBook}>
            <h1>{'book-review'}</h1>

            <label htmlFor="fullname">Full name:</label>
            <input
                autoFocus
                onChange={handleChange}
                value={review.fullname}
                id="fullname"
                name="fullname"
                type="text"
                placeholder="FullName" />

            <label htmlFor="date">Date:</label>
            <input
                onChange={handleChange}
                type="date"
                id="readAt"
                name="readAt"
                value={review.readAt} />

            <div className='rate-by-choice'>
                <p>select rating type:</p>
                <input name='rating'
                    onChange={(ev) => onchangeCmpType(ev.target.value)}
                    id='select'
                    type="radio"
                    value='select' />
                <label htmlFor='select'>Select</label>

                <input name='rating'
                    onChange={(ev) => onchangeCmpType(ev.target.value)}
                    id='numInput'
                    type="radio"
                    value='numInput' />
                <label htmlFor='numInput'>Number Input</label>

                <input name='rating'
                    onChange={(ev) => onchangeCmpType(ev.target.value)}
                    id='stars'
                    type="radio"
                    value='stars' />
                <label htmlFor='stars'>Stars</label>
            </div>

            <label>Choose Rating Type:</label>
            <DynamicCmp type={cmpType} rating={review.rating} onSetRating={onSetRating} />
            <TextboxRating handleChange= {handleChange} txt ={review.txt}/>

            <button>Save</button>
        </form>

    </section>

}
function DynamicCmp(props) {
    console.log(props)

    switch (props.type) {
        case 'select':
            return <RateBySelect {...props} />
        case "numInput":
            return <RateByNumInput {...props} />
        case "stars":
            return <RateByStars  {...props} />
    }
}


