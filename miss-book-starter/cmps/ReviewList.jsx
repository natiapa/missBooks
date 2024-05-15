
const { useState, useRef } = React
const { useNavigate } = ReactRouter


import { RateBySelect } from "./RateBySelect.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"
import { RateByStars } from "./RateByStars.jsx"



import { bookService } from '../services/book.service.js'

export function ReviewList({ bookId }) {

    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('')
    const [review, setReview] = useState({
        fullname: '',
        rating: 0,
        readAt: '',
    })

    

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
     function onSetRating(newRating){
        setReview(prevStyle => ({ ...prevStyle, ...newRating }))
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

            <label>Choose Rating Type:</label>
            <DynamicCmp selectedOption={selectedOption} rating={review.rating} onSetRating={onSetRating} />
            <select onChange={(ev) => setSelectedOption(ev.target.value)}>
                <option value=""></option>
                <option value="select">By Select</option>
                <option value="textbox">By Textbox</option>
                <option value="stars">By Stars</option>
            </select>


            <label htmlFor="date"></label>
            <input onChange={handleChange} type="date" id="readAt" name="readAt"
                value={review.readAt} />

            <button>Save</button>
        </form>

    </section>

}
function DynamicCmp(props) {
    console.log(props)

    switch (props.selectedOption) {
        case 'select':
            return <RateBySelect {...props} />
        case "textbox":
            return <RateByTextbox {...props} />
        case "stars":
            return <RateByStars  {...props} />
    }
}


