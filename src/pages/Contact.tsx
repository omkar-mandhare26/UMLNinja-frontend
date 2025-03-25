import React, { useEffect, useState } from "react";

const Contact = () => {
    useEffect(() => {
        document.title = "Contact UMLNinja";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Your message has been sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg mt-14 text-primary-500 font-heading">
            <h1 className="mb-4 text-3xl font-bold text-center">Contact Us</h1>
            <p className="mb-6 text-center text-gray-600">
                Reach out to us for any queries or support.
            </p>

            <div className="mb-6 text-center">
                <p>
                    <span className="font-bold">Address:</span> Ashok Nagar,
                    Nashik, India - 422012
                </p>
                <p>
                    <span className="font-bold">Email:</span>{" "}
                    <a
                        href="mailto:omkarmandhare26@gmail.com"
                        className="text-info"
                    >
                        omkarmandhare26@gmail.com
                    </a>
                </p>
                <p>
                    <span className="font-bold">Phone:</span> +91 95292 76877
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 text-white rounded bg-info hover:bg-info-hover"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
