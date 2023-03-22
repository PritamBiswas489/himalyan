import React, { useState } from 'react';
import ScrollSpy from 'react-ui-scrollspy';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Test = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const images = [{ src: 'https://placekitten.com/1500/500' }, { src: 'https://placekitten.com/4000/3000' }];
    const onPress = (e) => {
        e.preventDefault();
        const target = window.document.getElementById(e.currentTarget.href.split('#')[1]);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            {/* </ScrollSpy> */}
            <div
                style={{
                    height: '100vh',
                    margin: '200px',
                }}
            >
                <button
                    onClick={() => {
                        // alert();
                        setIsOpen(true);
                    }}
                >
                    view
                </button>
                <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={images} />
            </div>
        </>
    );
};

export default Test;
