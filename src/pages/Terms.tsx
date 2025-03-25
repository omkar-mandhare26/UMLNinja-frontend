import { useEffect } from "react";

const Terms = () => {
    useEffect(() => {
        document.title = "Terms and Conditions of UMLNinja";
    }, []);
    return (
        <>
            <div className="max-w-4xl p-6 mx-auto text-primary-100">
                <h1 className="mb-4 text-3xl font-bold">
                    UMLNinja | Terms of Service
                </h1>
                <p className="mb-4 text-sm text-primary-300">
                    Last Updated: 2025/02/04
                </p>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing or using UMLNinja, you agree to be bound by
                        these Terms. If you do not agree, please do not use our
                        services.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        2. Changes to Terms
                    </h2>
                    <p>
                        UMLNinja reserves the right to modify these Terms at any
                        time. Any changes will be effective immediately upon
                        posting on our website.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        3. Account Registration
                    </h2>
                    <p>
                        You must register for an account to access certain
                        features. Keep your password confidential and be
                        responsible for its security.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        4. Payment and Subscriptions
                    </h2>
                    <p>
                        All payments are processed through Razorpay.
                        Subscription services renew automatically unless
                        canceled. No refunds are provided for payments made
                        before cancellation.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        5. Data Privacy
                    </h2>
                    <p>
                        Your use of UMLNinja is subject to our Privacy Policy,
                        which outlines how we collect, use, and protect your
                        data.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        6. Intellectual Property
                    </h2>
                    <p>
                        Users retain ownership of the content they create using
                        UMLNinja. We do not claim any rights over user-generated
                        diagrams.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        7. Limitation of Liability
                    </h2>
                    <p>
                        UMLNinja is not liable for any damages resulting from
                        the use of our services beyond the amount paid by the
                        user.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        8. Governing Law
                    </h2>
                    <p>
                        These Terms are governed by the laws of India, without
                        regard to conflict of law principles.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        9. Contact Information
                    </h2>
                    <p>
                        If you have any questions about these Terms, contact us
                        at{" "}
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
        </>
    );
};

export default Terms;
