import { Dialog } from '@headlessui/react';

export default function LoginModal({ onClose }) {
    return (
        <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <div className="relative bg-white text-black rounded-xl shadow-xl p-8 w-full max-w-md mx-auto">
                <Dialog.Title className="text-xl font-bold mb-4">Login or Sign Up</Dialog.Title>
                <p className="mb-6">You need to be logged in to send a request. Please login or create an account.</p>
                <div className="flex gap-4">
                    <button className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Login</button>
                    <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition">Sign Up</button>
                </div>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>&times;</button>
            </div>
        </Dialog>
    );
} 