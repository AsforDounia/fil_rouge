import React from 'react';
import { BellIcon } from 'lucide-react';

const TopBar = ({ userName, bloodType }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-bold text-burgundy">Mon Espace Donneur</h2>
                <p className="text-darkTeal opacity-90">Bienvenue, {userName}</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-darkTeal/10 p-2 rounded-lg text-darkTeal hover:text-teal">
                    <BellIcon className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-wine p-2 rounded-lg">
                    <span className="text-white">{bloodType}</span>
                    <img
                        src="/path/to/donor-avatar.png"
                        alt="Donor"
                        className="w-10 h-10 rounded-full border-2 border-cream"
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
