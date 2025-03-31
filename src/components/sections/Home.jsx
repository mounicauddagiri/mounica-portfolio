import { RevealOnScroll } from "../RevealOnScroll"
import image from "../../../public/mounica.jpg"
export const Home =() =>{
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 z-10 px-4">
                <div className="flex-shrink-0">
                    <img
                        src={image}
                        alt="Mounica"
                        className="w-60 h-60 md:w-60 md:h-60 object-cover rounded-full border-2 border-blue-300 shadow-lg"/>
                </div>
            
                <div className="text-center z-10 px-4 ">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
                        Hi, I'm Mounica
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                    I'm a full-stack developer who loves creating clean, scalable and responsive web applications. 
                    I aim to provide solutions that offer both exceptional performance and delightful user experience.              
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="#projects" className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden 
                        hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)">
                            View Projects
                        </a>
                        <a
                        href="#contact"
                        className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 
                        hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </section>
    )
}