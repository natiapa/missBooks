
export function TextboxRating({ handleChange, txt }) {

    function onSetTxt({ target }) {
        const txt = target.value
        handleChange({ target: { name: 'txt', value: txt, type: 'text' } })
    }

    return <textarea
        name='txt'
        cols='30'
        rows='10'
        value={txt}
        onChange={onSetTxt}
    ></textarea>
}