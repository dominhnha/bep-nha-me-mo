import React from 'react';
import Select from 'react-select';


export default ({ onChange, options, value, className,placeholder }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <div className={className}>
            <Select
                value={defaultValue(options, value)}
                placeholder={placeholder}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>

    )
}