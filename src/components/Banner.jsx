"use client";
import Image from 'next/image';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const Banner = () => {
    return (
        <section className='bg-white'>
        <ParallaxProvider>
            <div className="relative bg-white">
                <Parallax speed={-10}>
                    <div className="relative w-full h-[500px]">
                        <Image
                            src="/header.jpg"
                            alt="Banner"
                            layout="fill" 
                            objectFit="cover" 
                            priority 
                        />
                    </div>
                </Parallax>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl mb-2">Ideas</h1> 
                    <h2 className="text-white text-2xl">Where all our great things begin</h2>
                </div>
            </div>
        </ParallaxProvider>
        </section>
    );
};

export default Banner;
