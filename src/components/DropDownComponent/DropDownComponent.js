"use client"
import React, { useState } from 'react';
import Select from 'react-select';

const DropDownComponent = ({ options  , setId}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setId(selectedOption ? selectedOption.id : null);
    };

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
};

export default DropDownComponent;