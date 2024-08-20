import React from 'react'

function Button({ handleOnClick, text }) {
    return (
        <button
            onClick={handleOnClick}
            type="button"
            className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {text}
        </button>
    )
}

export default Button