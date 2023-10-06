import React, {useRef, useState} from 'react';
import {Outlet} from "react-router-dom";
import {AiOutlineAim, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

import './mainLayout.scss'
import {scaleService, updateService} from "../../service";

function MainLayout() {
    const scales = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
    const [selectedScale, setSelectedScale] = useState<number>(100);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [initialOffset, setInitialOffset] = useState<{ x: number; y: number } | null>(null);
    const blockRef = useRef<HTMLDivElement>(null);

    const handleScaleChange = (scale: number) => {
        setSelectedScale(scale);
        scaleService.setScale(scale);
        updateService.onClick()
    };

    const handleFitToScreen = () => {
        const screenWidth = window.innerWidth;
        const blockHtml = document.getElementById('blockForScale')
        const blockWidth = blockHtml!.scrollWidth
        const currentScale = scales.find(value => value > screenWidth * .7 / blockWidth * 100);
        handleScaleChange(currentScale!);
    };

    const handleIncreaseScale = () => {
        const currentIndex = scales.indexOf(selectedScale);
        if (currentIndex < scales.length - 1) {
            const newScale = scales[currentIndex + 1];
            handleScaleChange(newScale);
        }
    };

    const handleDecreaseScale = () => {
        const currentIndex = scales.indexOf(selectedScale);
        if (currentIndex > 0) {
            const newScale = scales[currentIndex - 1];
            handleScaleChange(newScale);
        }
    };

    const blockStyle: React.CSSProperties = {
        transform: `scale(${selectedScale / 100})`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
        cursor: isDragging ? 'grabbing' : 'grab'
    };

    // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     if (e.button === 0 && blockRef.current) {
    //         setIsDragging(true);
    //         setInitialOffset({
    //             x: e.clientX - blockRef.current.getBoundingClientRect().left,
    //             y: e.clientY - blockRef.current.getBoundingClientRect().top,
    //         });
    //     } else {
    //         handleMouseUp()
    //     }
    // };

    // const handleMouseUp = () => {
    //     setIsDragging(false);
    //     setInitialOffset(null);
    // };
    //
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     if (isDragging && blockRef.current && initialOffset) {
    //         const offsetX = e.clientX - initialOffset.x;
    //         const offsetY = e.clientY - initialOffset.y;
    //         blockRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${selectedScale / 100})`;
    //     }
    // };

    return (
        <div className={'main_layout'}>
            <div className="zoomable_container">
                <div className="zoomable_block">
                    <button onClick={handleIncreaseScale}><AiOutlinePlus/></button>
                    <select value={selectedScale.toString()}
                            onChange={(e) => handleScaleChange(parseInt(e.target.value))}>
                        {scales.map((scale) => (
                            <option key={scale} value={scale.toString()}>
                                {scale}%
                            </option>
                        ))}
                    </select>
                    <button onClick={handleDecreaseScale}><AiOutlineMinus/></button>
                    <button onClick={handleFitToScreen}><AiOutlineAim/></button>
                </div>
                <div id={'blockForScale'}
                     className={'blockForScale'}
                     style={blockStyle}
                     ref={blockRef}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export {MainLayout};
