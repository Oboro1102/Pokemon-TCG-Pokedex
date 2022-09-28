import { useState, useEffect } from 'react';
import { Circle, Icon, Fade } from '@chakra-ui/react'
import { CgChevronUp } from "react-icons/cg";

export const ScrollToTop = () => {
    // state
    const [scrollPosition, setScrollPosition] = useState(0);

    // methods
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const changeScrollPosition = () => {
        const { pageYOffset } = window;
        setScrollPosition(pageYOffset);
    };

    // hooks
    useEffect(() => {
        window.addEventListener('scroll', changeScrollPosition, { passive: true });

        return () => {
            window.removeEventListener('scroll', changeScrollPosition);
        };
    }, []);

    return (
        <Fade in={scrollPosition > 0}>
            <Circle position='fixed' bottom='5vh' right='1rem' size='40px' bg='blue.400' color='white' cursor='pointer' onClick={() => scrollToTop()}>
                <Icon boxSize='1.5em' as={CgChevronUp} />
            </Circle>
        </Fade>
    )
}

