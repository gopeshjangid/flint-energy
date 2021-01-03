import React from 'react';
import Forms from "../components/home/Forms";
import Header from '../components/common/header';
import Navigation from '../components/home/navigation';


export default function ParentFroms() {

    return (
        <>
            <link
                rel="stylesheet"
                href="/static/css/bootstrap.css"
            />
            <link
                rel="stylesheet"
                href="/static/css/style.css"
            />
            <br />
            <br />
            <br />
            <Header />
            <Forms />
        </>

    );
}