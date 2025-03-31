import { RevealOnScroll } from "../RevealOnScroll";

export const About = () =>{

    const frontendSkills = ["React", "Vue", "TypeScript", "TailwindCSS", "Angular", "MaterialUI"];
    const backendSkills = ["Node.js", "Java", "MySQL", "MongoDB", "Python", "AWS"];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
                    {" "}
                    About Me
                </h2>
                <div className="rounded-xl p-8  border-white/10 border hover:-transalte-y-1 transition-all">
                    <p className="text-gray-300 mb-6">
                        Passionate developer with expertise in building scalable and responsive web applications.
                    </p>
                
                    <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-6">
                        <div className="rounded-xl p-6  hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4 ">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                            {frontendSkills.map((tech, key) => (
                                <span
                                key={key}
                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                                "
                                >
                                {tech}
                                </span>
                            ))}
                            </div>
                        </div>

                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-bold mb-4">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                            {backendSkills.map((tech, key) => (
                                <span
                                key={key}
                                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                                hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                                "
                                >
                                {tech}
                                </span>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                    <h3 className="text-xl font-bold mb-4"> 🏫 Education </h3>
                    <ul className=" text-left list-inside text-gray-300 space-y-2">
                        <li>
                            <strong> M.S. in Computer Science</strong> - University of Maryland Baltimore County (2021-23)
                        </li>
                        <p className="text-sm">
                            Relevant Coursework: Data Structures, Distributed Systems, Cloud Computing, Computer Architecture
                        </p>
                    </ul>
                    </div>
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
                    <h3 className="text-xl font-bold mb-4"> 💼 Work Experience </h3>
                    <div className="space-y-4 text-gray-300 text-left">
                        <div >
                            <h4 className="font-semibold">
                                Software Engineer at MyStudio (Jan 2024 - Present)
                            </h4>
                            <p className="text-sm">
                                Develop and maintain B2B membership management software for fitness studios.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4 text-gray-300 text-left">
                        <div >
                            <h4 className="font-semibold">
                                Software Engineer Intern at RocketMortgage (May 2022 - Jan 2023)
                            </h4>
                            <p className="text-sm">
                                Assisted in building frontend components for the loan rate pricing models
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4 text-gray-300 text-left">
                        <div >
                            <h4 className="font-semibold">
                                Software Engineer at Infor (June 2018 - Aug 2021)
                            </h4>
                            <p className="text-sm">
                                Developed and maintained the Web page widgets for the Infor Home Pages.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </section>
    )
}