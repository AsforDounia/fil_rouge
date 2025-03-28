import React from "react";
import { Head , router } from "@inertiajs/react";
import { useForm } from "react-hook-form";

export default function patientDashboard() {
    const {
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmitLogout = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('/api/logout', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
                localStorage.removeItem("token");
                router.visit('/');
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error :", error);
        }
    };

    return (
        <>
            <Head title="dashboardDonor" />
            <div>
                <h1>Hello Donor</h1>
                <a href="/api/login" className="text-wine hover:underline">
                    Connectez
                </a>
            </div>

            <form onSubmit={handleSubmit(onSubmitLogout)}>
                <button type="submit">Se deconnecter</button>
            </form>
        </>
    );
}
