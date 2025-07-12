import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { getUsers } from "../helpers/userApi";

const LIMIT = 10;

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (pageNum = 1, searchTerm = "") => {
        setLoading(true);
        try {
            const res = await getUsers({ page: pageNum, limit: LIMIT, search: searchTerm });
            setUsers(res.users);
            setTotalPages(res.totalPages);
        } catch (e) {
            setUsers([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page, search);
        // eslint-disable-next-line
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchUsers(1, search);
    };

    const handleRequest = (user) => {
        alert(`Request sent to ${user.name}`);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-gray-100 px-4 py-8" style={{ fontFamily: "'Indie Flower', cursive, sans-serif" }}>
            <div className="max-w-4xl mx-auto">
                {/* Search and Filter Bar */}
                <form onSubmit={handleSearch} className="flex items-center gap-4 mb-8">
                    {/* <select className="bg-neutral-800 border-2 border-gray-100 rounded-lg px-4 py-2 text-gray-100" disabled>
                        <option>Availability</option>
                    </select> */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-neutral-800 border-2 border-gray-100 rounded-lg px-4 py-2 text-gray-100"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button type="submit" className="px-6 py-2 rounded-lg border-2 border-gray-100 bg-neutral-900 text-gray-100 font-bold hover:bg-neutral-800 transition">search</button>
                </form>
                {/* User Cards */}
                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-12">No users found.</div>
                ) : (
                    users.map(user => (
                        <UserCard key={user._id} user={user} onRequest={handleRequest} />
                    ))
                )}
                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        className="text-2xl px-2 disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >&lt;</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`text-xl px-3 py-1 rounded-full border-2 border-gray-100 mx-1 ${page === i + 1 ? "bg-gray-100 text-neutral-900" : "bg-neutral-900 text-gray-100"}`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="text-2xl px-2 disabled:opacity-50"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >&gt;</button>
                </div>
            </div>
        </div>
    );
} 