import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home({isAuth}) {
    return (
<div>
    <section className="py-5 text-center container-fluid w-100 bkImage pt-0" style={{ height: 450, position: 'relative' }}>
        <div className="row py-lg-5 trans-background d-flex justify-content-center align-items-center" style={{ height: 450, background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="col-lg-6 col-md-8 mx-auto">
                <p className="slog trans-background-content">Empower Your Body, Elevate Your Mind: Embrace the Fitness Journey for a Healthier, Stronger, and More Energized You!</p>
                <p>
                <Link to={'/class'} className="btn btn-light my-2">Classes</Link>
                </p>
            </div>
        </div>
    </section>
</div>
    )
}
