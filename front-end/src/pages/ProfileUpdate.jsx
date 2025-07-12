import React, { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile } from "../helpers/userApi";

const AVAILABILITY_OPTIONS = [
    "weekends",
    "weekdays",
    "mornings",
    "afternoons",
    "evenings",
    "nights",
    "anytime",
];

export default function ProfileUpdate() {
    const [profile, setProfile] = useState({
        name: "",
        address: "",
        skillsOffered: [],
        skillsWanted: [],
        availability: "weekends",
        isPrivate: false,
        profileImage: "",
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [newSkillOffered, setNewSkillOffered] = useState("");
    const [newSkillWanted, setNewSkillWanted] = useState("");
    const fileInputRef = useRef();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile();

            setProfile(response.user);
        }
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile({
            ...profile,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddSkill = (type) => {
        if (type === "offered" && newSkillOffered.trim()) {
            setProfile({ ...profile, skillsOffered: [...profile.skillsOffered, newSkillOffered.trim()] });
            setNewSkillOffered("");
        }
        if (type === "wanted" && newSkillWanted.trim()) {
            setProfile({ ...profile, skillsWanted: [...profile.skillsWanted, newSkillWanted.trim()] });
            setNewSkillWanted("");
        }
    };

    const handleRemoveSkill = (type, idx) => {
        if (type === "offered") {
            setProfile({ ...profile, skillsOffered: profile.skillsOffered.filter((_, i) => i !== idx) });
        } else {
            setProfile({ ...profile, skillsWanted: profile.skillsWanted.filter((_, i) => i !== idx) });
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
        }
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setProfile({ ...profile, profileImage: "" });
    };

    const handleSave = () => {
        // TODO: Implement updateProfile API call
        alert("Profile saved (API call not implemented)");
    };

    const handleDiscard = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-gray-100 px-4 py-8 w-full" style={{ fontFamily: "'Indie Flower', cursive, sans-serif" }}>
            <div className="mx-auto border-2 border-gray-100 rounded-2xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button className="font-bold text-emerald-400 mr-4" onClick={handleSave}>Save</button>
                        <button className="font-bold text-red-400" onClick={handleDiscard}>Discard</button>
                    </div>
                </div>
                <hr className="border-gray-100 mb-8" />
                {/* Profile Form */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b-2 border-gray-100 text-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b-2 border-gray-100 text-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl">Skills Offered</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {profile.skillsOffered.map((skill, idx) => (
                                    <span key={idx} className="border border-gray-100 rounded-full px-3 py-1 bg-neutral-800 flex items-center">
                                        {skill}
                                        <button className="ml-2 text-red-400" onClick={() => handleRemoveSkill("offered", idx)}>×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkillOffered}
                                    onChange={e => setNewSkillOffered(e.target.value)}
                                    className="flex-1 bg-transparent border-b-2 border-gray-100 text-lg focus:outline-none"
                                    placeholder="Add skill"
                                />
                                <button className="text-blue-400 font-bold" onClick={() => handleAddSkill("offered")}>Add</button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl">Availability</label>
                            <select
                                name="availability"
                                value={profile.availability}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b-2 border-gray-100 text-lg focus:outline-none"
                            >
                                {AVAILABILITY_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6 flex items-center gap-4">
                            <label className="block text-xl">Profile Private</label>
                            <input
                                type="checkbox"
                                name="isPrivate"
                                checked={profile.isPrivate}
                                onChange={handleChange}
                                className="w-5 h-5 accent-blue-500"
                            />
                        </div>
                    </div>
                    {/* Right Side */}
                    <div>
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-32 h-32 rounded-full border-2 border-gray-100 flex items-center justify-center overflow-hidden bg-neutral-800 text-center text-lg relative">
                                {profile.profileImage ? (
                                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span>Profile Photo</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handlePhotoChange}
                                />
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    <button className="text-blue-400 text-sm" onClick={() => fileInputRef.current.click()}>Add/Edit</button>
                                    {profile.profileImage && <button className="text-red-400 text-sm" onClick={handleRemovePhoto}>Remove</button>}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl">Skills wanted</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {profile.skillsWanted.map((skill, idx) => (
                                    <span key={idx} className="border border-gray-100 rounded-full px-3 py-1 bg-neutral-800 flex items-center">
                                        {skill}
                                        <button className="ml-2 text-red-400" onClick={() => handleRemoveSkill("wanted", idx)}>×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkillWanted}
                                    onChange={e => setNewSkillWanted(e.target.value)}
                                    className="flex-1 bg-transparent border-b-2 border-gray-100 text-lg focus:outline-none"
                                    placeholder="Add skill"
                                />
                                <button className="text-blue-400 font-bold" onClick={() => handleAddSkill("wanted")}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 