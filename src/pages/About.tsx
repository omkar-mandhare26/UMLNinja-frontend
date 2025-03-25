import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = "About UML Ninja";
    }, []);

    return (
        <div className="max-w-4xl p-6 mx-auto text-primary-100">
            <h1 className="mb-4 text-3xl font-bold text-center">
                About UMLNinja
            </h1>
            <p className="mb-6 text-lg text-center text-gray-200">
                UMLNinja is your go-to AI-powered UML diagram generation tool,
                helping developers create precise and efficient diagrams
                effortlessly.
            </p>

            <section className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Our Mission</h2>
                <p>
                    At UMLNinja, we strive to simplify software architecture
                    visualization by enabling users to generate UML diagrams
                    using AI-powered prompts. Our goal is to enhance
                    productivity and streamline the development process.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Core Features</h2>
                <ul className="pl-6 list-disc">
                    <li>Generate UML diagrams from text prompts</li>
                    <li>Support for multiple UML formats</li>
                    <li>AI-powered PlantUML code generation</li>
                    <li>Fast and secure rendering</li>
                    <li>
                        Credit-based payment system with Razorpay integration
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="mb-2 text-xl font-semibold">Why Choose Us?</h2>
                <p>
                    UMLNinja eliminates the need for manual diagramming by
                    leveraging AI to transform your descriptions into structured
                    UML diagrams. Whether you're a software engineer, architect,
                    or student, our platform helps you visualize your ideas
                    quickly and efficiently.
                </p>
            </section>

            <section className="mt-8 text-center">
                <h2 className="mb-2 text-xl font-semibold">Get in Touch</h2>
                <p>
                    Have questions? Contact us at{" "}
                    <a
                        href="mailto:omkarmandhare26@gmail.com"
                        className="text-info"
                    >
                        omkarmandhare26@gmail.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
};

export default About;
