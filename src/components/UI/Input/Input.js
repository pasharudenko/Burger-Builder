import React from 'react';

const Input = (props) => {
    let inputType, restProps, element;
    ({inputType, ...restProps} = props);

    switch (inputType) {
        case 'input':
            element = <input {...restProps} />;
            break;
        case 'textarea':
            element = <textarea {...restProps} />;
            break;
        default:
            element = <input {...restProps} />;
            break;
    }

    return (
        <div>
            <label>{props.label}</label>
            {element}
        </div>
    );

};

export default Input;