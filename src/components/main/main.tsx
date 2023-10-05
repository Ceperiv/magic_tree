import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineApartment, AiOutlineLeft, AiOutlineRest} from "react-icons/ai";

import './main.scss';
import {MainInput} from "../../shared";

interface InputProps {
    level: number;
    parentId?: number;
    xxx?: number | null;
    yyy?: number | null;
}

const Main: React.FC<InputProps> = ({level, parentId, xxx, yyy}) => {
    const [xx1, setX1] = useState<number>();
    const [yy1, setY1] = useState<number>();
    const [xx2, setX2] = useState<number>();
    const [yy2, setY2] = useState<number>();
    const [childInputs, setChildInputs] = useState<number[]>([]);
    const [isOnDelete, setIsOnDelete] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const onAddInput = () => {
        const id = Date.now();
        setChildInputs([...childInputs, id]);
    };

    const onDeleteInput = (): void => {
        setIsOnDelete(true)
    };

    const deleteItem = (index: number) => {
        const newChild = childInputs.filter((_, i) => i !== index);
        setChildInputs(newChild);
        // setIsOnDelete(false);
    };

    useEffect(() => {
        const updateLine = () => {
            if (inputRef.current && svgRef.current) {
                const svgRect = svgRef.current.getBoundingClientRect();

                const inputRect = inputRef.current.getBoundingClientRect();
                console.log(inputRect)

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
                    if (xxx && yyy) {
                        line.setAttribute('x1', xxx.toString());
                        line.setAttribute('y1', yyy.toString());

                    }
                }
            }
        };

        updateLine();

        window.addEventListener('resize', updateLine);
        return () => {
            window.removeEventListener('resize', updateLine);
        };
    }, [xx1, xx2, yy1, yy2, yyy, yyy, inputRef?.current?.getBoundingClientRect().x]);

    return (
        <div className="main_container" style={{marginLeft: "10px"}}>
            <div className="input_container">

                <div ref={inputRef}><MainInput onAddInput={onAddInput}/>

                </div>

                {childInputs.length && !isOnDelete ? <button onClick={onDeleteInput}><AiOutlineRest/></button> : null}
                {isOnDelete && <button onClick={() => setIsOnDelete(false)}><AiOutlineLeft/></button>}
                {isOnDelete && childInputs.map((value, index) =>
                    <button onClick={() => deleteItem(index)}><AiOutlineApartment/>{index + 1}</button>
                )}
            </div>
            <div className="child_container">
                {childInputs.map((id) => (
                    <div className="child-input-container" key={id}>
                        <div className="line"></div>
                        <Main level={level + 1} parentId={id} xxx={xx1} yyy={yy1}/>
                    </div>
                ))}
            </div>
            <svg ref={svgRef} width="100%" height="100%"
                 style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     background: "none",
                     zIndex: -1,
                     display: parentId === 1 ? 'none' : "block"
                 }}>
                <line style={{stroke: 'black', strokeWidth: 2}}/>
            </svg>
        </div>
    );
};

export {Main};
