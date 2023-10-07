import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineApartment, AiOutlineLeft, AiOutlineRest} from "react-icons/ai";

import './main.scss';
import {MainInput} from "../../shared";
import {updateService} from "../../service";

interface InputProps {
    level: number;
    parentId?: number;
    isUpdate?: number;
    parrentXprops?: number | null;
    parrentYprops?: number | null;
}

const Main: React.FC<InputProps> = ({level, parentId, parrentXprops, parrentYprops, isUpdate}) => {
    const [xx1, setX1] = useState<number>();
    const [yy1, setY1] = useState<number>();
    const [xx2, setX2] = useState<number>();
    const [yy2, setY2] = useState<number>();
    const [childInputs, setChildInputs] = useState<number[]>([]);
    const [isOnDelete, setIsOnDelete] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<number>(1);

    const inputRef = useRef<HTMLInputElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const onAddInput = () => {
        const id = Date.now();
        setChildInputs([...childInputs, id]);
    };

    const onDeleteInput = (): void => {
        setIsOnDelete(true)
        updateService.onClick()
    };

    const deleteItem = (index: number) => {
        const newChild = childInputs.filter((_, i) => i !== index);
        setChildInputs(newChild);
        setIsChanged(Date.now())
        updateService.onClick()
    };

    useEffect(() => {
        const updateLine = () => {
            if (inputRef.current && svgRef.current) {
                const svgRect = svgRef.current.getBoundingClientRect();
                const inputRect = inputRef.current.getBoundingClientRect();

                const x1 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y1 = inputRect.bottom - svgRect.top;
                const x2 = inputRect.left + inputRect.width / 2 - svgRect.left;
                const y2 = inputRect.top - svgRect.top;

                setX1(x1);
                setY1(y1);
                setX2(x2);
                setY2(y2);

                const line = svgRef.current.querySelector('line');

                if (line && xx2 && yy2) {
                    line.setAttribute('x2', xx2.toString());
                    line.setAttribute('y2', yy2.toString());
                    if (parrentXprops && parrentYprops) {
                        line.setAttribute('x1', parrentXprops.toString());
                        line.setAttribute('y1', parrentYprops.toString());
                    }
                }

                childInputs.forEach(id => {
                    const childInput = document.querySelector(`[data-key="${id}"]`);
                    const childSvg = childInput?.querySelector('svg');
                    const childLine = childSvg?.querySelector('line');

                    if (childLine && x1 && y1) {
                        childLine.setAttribute('x1', x1.toString());
                        childLine.setAttribute('y1', y1.toString());
                    }
                });
            }
        };

        updateLine();

        window.addEventListener('resize', updateLine);
        return () => {
            window.removeEventListener('resize', updateLine);
        };


    }, [xx1, xx2, yy1, yy2, parrentYprops, parrentYprops, inputRef?.current?.getBoundingClientRect().x, inputRef?.current?.getBoundingClientRect().y, childInputs, isChanged, isOnDelete, parentId, isUpdate]);

    return (

        <div className="main_container" style={{marginLeft: "10px"}}>
            <div className="input_container">
                <button style={{display: "none"}}
                        onClick={() => setIsChanged(Date.now)}
                        id={`button_${level}`}>
                    btn_{level}
                </button>

                <div ref={inputRef}><MainInput onAddInput={onAddInput}/>

                </div>
                {childInputs.length && !isOnDelete ? <button className={'del_btn'} onClick={onDeleteInput}><AiOutlineRest/></button> : null}
                {isOnDelete && <button className={'back_btn'} onClick={() => setIsOnDelete(false)}><AiOutlineLeft/></button>}
                {isOnDelete && childInputs.map((value, index) =>
                    <button className={'del_btn'} onClick={() => deleteItem(index)}><AiOutlineApartment/>{index + 1}</button>
                )}
            </div>
            <div className="child_container">
                {childInputs.map((id) => (
                    <div className="child-input-container" key={id}>
                        <div className="line"></div>
                        <Main level={level + 1} parentId={id} parrentXprops={xx1} parrentYprops={yy1} isUpdate={Date.now()}/>
                    </div>
                ))}
            </div>
            <svg ref={svgRef} width="100%" height="100%"
                 style={{
                     position: 'absolute',
                     top: 0,
                     left: '50%',
                     transform: 'translateX(-50%)',
                     background: "none",
                     zIndex: -1,
                     display: parentId === 1 ? 'none' : "block"
                 }}>
                <line style={{stroke: 'dimgray', strokeWidth: 1}}/>
            </svg>
        </div>
    );
};

export {Main};
