export function RateByTextbox ({rating,onSetRating}) {

  function handleChange({target}){
        let ratingVal = Math.min(Math.max(parseInt(target.value), 1), 5)
        const newRating = {rating: ratingVal}
        onSetRating(newRating)
    }

    return <div>
    <div>
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={rating}
        min="1"
        max="5"
        onChange={handleChange}
      />
    </div>
</div>
}