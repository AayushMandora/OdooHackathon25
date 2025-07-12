import React from "react";

export default function UserCard({ user, onRequest }) {
    return (
        <div className="border-2 border-gray-100 rounded-2xl p-6 flex items-center gap-6 bg-neutral-900 text-gray-100 mb-6 relative" style={{ fontFamily: "'Indie Flower', cursive, sans-serif" }}>
            {/* Profile Photo and Name Tooltip */}
            <div className="relative flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-2 border-gray-100 flex items-center justify-center overflow-hidden bg-neutral-800 text-center text-lg">
                    {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span>Profile Photo</span>
                    )}
                </div>
                {/* Tooltip */}
                {/* <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-10">
                    <span className="bg-yellow-900 text-yellow-100 px-3 py-1 rounded shadow text-sm">{user.name}</span>
                </div> */}
            </div>
            {/* User Info */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold">{user.name}</span>
                </div>
                <div className="mb-1">
                    <span className="text-emerald-400">Skills Offered =&gt; </span>
                    {user.skillsOffered?.map((skill, i) => (
                        <span key={i} className="inline-block border border-gray-100 rounded-full px-3 py-1 mx-1 text-sm bg-neutral-800">{skill}</span>
                    ))}
                </div>
                <div className="mb-1">
                    <span className="text-blue-400">Skill wanted =&gt; </span>
                    {user.skillsWanted?.map((skill, i) => (
                        <span key={i} className="inline-block border border-gray-100 rounded-full px-3 py-1 mx-1 text-sm bg-neutral-800">{skill}</span>
                    ))}
                </div>
                <div className="text-sm mt-2">rating <span className="font-bold">{user.rating || "0"}/5</span></div>
            </div>
            {/* Request Button */}
            <div className="flex flex-col items-end justify-between h-full">
                <button
                    className="px-6 py-2 rounded-lg border-2 border-cyan-400 bg-cyan-700 text-white font-bold text-lg hover:bg-cyan-800 transition"
                    onClick={() => onRequest(user)}
                >
                    Request
                </button>
            </div>
        </div>
    );
} 