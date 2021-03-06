import React from 'react';

const Input = (props) => {
    let element, elementType, valid, restProps;
    ({elementType, valid, ...restProps} = props);

    switch (elementType) {
        case 'input':
            element = <input {...restProps} />;
            break;
        case 'textarea':
            element = <textarea {...restProps} />;
            break;
        case 'select':
            element =
                <select className={restProps.className} name={restProps.name} onChange={restProps.onChange}>
                    {
                        restProps.options.map(curr => {
                            return (
                                <option key={curr.value} value={curr.value}>{curr.displayValue}</option>
                            );
                        })
                    }
                </select>;
            break;
        default:
            element = <input {...restProps} />;
            break;
    }

    return (
        <div>
            {/*<label>{props.label}</label>*/}
            {element}
        </div>
    );

};

export default Input;