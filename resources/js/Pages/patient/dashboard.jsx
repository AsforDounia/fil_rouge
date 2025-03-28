import React from "react";
import { Head } from "@inertiajs/react";



export default function Home() {
    return (
        <>
            <Head title="dashboardPatient" />
            <div>
                <h1>Hello Patient</h1>
                <a href="/api/login" className="text-wine hover:underline">
                  Connectez
                </a>
            </div>
        </>
    );
}


