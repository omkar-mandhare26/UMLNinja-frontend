import { Link } from "react-router-dom";
import MapPin from "../icons/MapPin";
import Phone from "../icons/Phone";
import Mail from "../icons/Mail";

const sections = [
    {
        title: "Know Us More!",
        links: [
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy-policy" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="bg-primary-100 font-body">
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-primary-700 font-heading">
                            UMLNinja
                        </h2>
                        <div className="space-y-4 text-primary-400">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 mt-0.5 text-primary-500" />
                                <span>Nashik, Maharashtra, India🇮🇳</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary-500" />
                                <span>+91-9529276877</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary-500" />
                                <span>omkarmandhare26@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h2 className="text-lg font-bold text-primary-700 font-heading">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.href}
                                            className="transition-colors duration-200 text-primary-400 hover:text-primary-500"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pt-8 mt-12 border-t border-primary-200">
                    <p className="text-sm text-center text-primary-400">
                        © {new Date().getFullYear()} UMLNinja. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
