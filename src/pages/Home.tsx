import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
    const diagramNames = [
        "Class",
        "Use Case",
        "Activity",
        "Component",
        "Start",
        "Object",
        "Sequence",
        "Deployment",
        "State",
    ];

    const [currDiagramVal, setCurrDiagramVal] = useState("Class");
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let index = 0;
        const diagramClock = setInterval(() => {
            setAnimate(false);
            setTimeout(() => {
                index = (index + 1) % diagramNames.length;
                setCurrDiagramVal(diagramNames[index]);
                setAnimate(true);
            }, 100);
        }, 2000);

        return () => clearInterval(diagramClock);
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <div className="container">
                    <div className="text-2xl font-bold text-center mt-14">
                        Create professional UML diagrams in minutes for your
                        project documentation
                    </div>
                    <div className="">
                        <div className={` ${animate ? "slide-in" : ""}`}>
                            {currDiagramVal}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
