import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {AiOutlineCheck, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";

import './mainInput.scss';

interface MainInputProps {
    onAddInput: (inputValue: string) => void;
}

type FormValues = {
    inputValue: string;
};

const MainInput: React.FC<MainInputProps> = ({onAddInput}) => {
    const {register, handleSubmit, reset, formState} = useForm<FormValues>();
    const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        onAddInput(data.inputValue);
    };

    const onDisabled = () => {
        setIsInputDisabled(true)
    };

    const onEditInput = () => {
        setIsInputDisabled(false)
    };

    return (
        <div className={'input_wrapper'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="input" disabled={isInputDisabled} placeholder={'Title'}
                       type="text" {...register('inputValue', {required: true})} />

                {!isInputDisabled ?
                    <button disabled={!formState.isValid} onClick={onDisabled}><AiOutlineCheck/></button> : null}
                {isInputDisabled ? <button><AiOutlinePlus/></button> : null}
            </form>
            <button onClick={onEditInput}><AiOutlineEdit/></button>
        </div>
    );
};

export {MainInput};

