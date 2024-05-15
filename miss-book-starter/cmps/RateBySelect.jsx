export function RateBySelect ({rating,onSetRating}) {

  function onHandleChange({target}) {
    console.log('target',target.value)
    const newRating = {rating: target.value}
    onSetRating(newRating)
    
  }
    
    return(
    <input
        onChange={onHandleChange}
        type="range"
        name="rating"
        value={rating}
        id="rating"
        min="0" max="5"
        low="1" high="5" optimum="5" />
      ) 

}

   