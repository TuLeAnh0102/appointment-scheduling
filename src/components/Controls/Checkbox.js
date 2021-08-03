import React,{useState,useEffect} from 'react'
import "../../scss/checkbox.css"
export default function Checkbox({
    label,
    name,
    value,
    onChange,
    styles
}) {
    const [checked, setchecked] = useState(0);
    useEffect(() => {
        setchecked(value);
    }, [value])
    return (
        <div style = {styles}>
            <label className="container" style={styles}>{label}
                <input type="checkbox" name={name} onChange={onChange} checked={checked}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}
