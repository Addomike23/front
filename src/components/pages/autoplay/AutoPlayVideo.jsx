import React from 'react';
import { videobanner } from '../../../assets/Assets';

export default function AutoPlayVideo() {
    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Featured Home Appliance</h2>

            <div className="w-full relative overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <video
                    className="w-full h-auto object-cover"
                    src={videobanner.video1}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                />

                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-4 text-white text-sm">
                    Explore smart home solutions for your daily comfort.
                </div>
            </div>
        </div>
    );
}
