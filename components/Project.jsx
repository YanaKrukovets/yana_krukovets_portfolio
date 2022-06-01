import react from 'react';
import Image from 'next/image';

const Project = ({href, src, alt, tech}) => {
    return (<div className="project-card">
        <a href={href}>
            <Image className="project-image"
            src={src}
            height={210} 
            width={290} 
            alt={alt}
            />
        </a>
        <p className="tech">{tech}</p>
    </div>);
}

export default Project;