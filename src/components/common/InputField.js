import React from 'react'
export default function TextField(props) {
    return <TextField
        required
        id={props.id}
        label={props.label}
        name={props.label}
        value={props.value}
        variant="outlined"
        fullWidth
        color="secondary"
        onChange={props.onChange}
    />

}

