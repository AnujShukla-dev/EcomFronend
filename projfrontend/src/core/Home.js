import React from 'react'
import "../styles.css"
import  Base from "./Base";

export default function Home() {
    console.log("API IS",process.env.REACT_APP_BACKEND)
    return (
        <Base title =" Welcome to Home"  description ="Its a Home Page">
            <h1 className ="text-white" >Hello frontend</h1>
        </Base>
    )
}
