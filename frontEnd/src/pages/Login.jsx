import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaHeartbeat,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await login(data);
            if(result.success){
                
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
            <div className="w-full max-w-4xl">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden flex">
                    <div
                        className="w-1/2 bg-burgundy relative flex flex-col justify-center items-center p-8"
                        style={{
                            backgroundImage:
                                "url(https://source.unsplash.com/random/900×700/?blood,donation)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundBlendMode: "overlay",
                        }}
                    >
                        <div className="text-center relative z-10">
                            <FaHeartbeat className="text-6xl text-cream mx-auto mb-4" />
                            <h1 className="text-4xl font-bold text-cream">
                                Blood<span className="text-white">Link</span>
                            </h1>
                            <p className="text-teal mt-2">
                                Donnez du sang, sauvez des vies
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-burgundy mb-2">
                                Connexion
                            </h2>
                            <p className="text-darkTeal">
                                Accédez à votre compte BloodLink
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-burgundy font-medium mb-2"
                                >
                                    Adresse Email
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email est requis",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Format d'email invalide",
                                            },
                                        })}
                                        placeholder="votre@email.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-burgundy font-medium mb-2"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        {...register("password", {
                                            required: "Mot de passe est requis",
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Le mot de passe doit contenir au moins 6 caractères",
                                            },
                                        })}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkTeal"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>


                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        {...register("remember")}
                                        className="mr-2 accent-wine rounded-sm"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm"
                                    >
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <a
                                    href="/forgot-password"
                                    className="text-wine hover:underline"
                                >
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-wine text-white py-3 rounded-lg hover:bg-burgundy transition-colors"
                            >
                                Se connecter
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="px-4 text-gray-500">ou</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <p>
                                Vous n'avez pas de compte ?{" "}
                                <a
                                    href="register"
                                    className="text-wine hover:underline"
                                >
                                    Inscrivez-vous
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;