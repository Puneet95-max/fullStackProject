import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DropDownComponent = ({ options, setType, multi, preselectedValues }) => {
    const [formatedOptions, setFormatedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    console.log("preselectedValues", preselectedValues) // string

    useEffect(() => {
        if (options && options.length > 0) {
            const data = options.map(item => ({
                value: item.name,
                label: item.name,
                id: item.id
            }));
            setFormatedOptions(data);
        }
    }, [options]);

    useEffect(() => {
        if (multi && preselectedValues && preselectedValues.length > 0) {
            const data = preselectedValues.map(item => ({
                value: item.name,
                label: item.name,
                id: item.id
            }));
            setSelectedOption(data);
        } else if (!multi && preselectedValues) {
            const data = {
                value: preselectedValues,
                label: preselectedValues,
                id: 1
            };
            setSelectedOption(data);
        } else {
            setSelectedOption(null);
        }
    }, [multi, preselectedValues]);
    

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (multi) {
            const formattedSelection = selectedOption
                ? selectedOption.map(option => ({ name: option.value }))
                : [];

            setType(formattedSelection);
        } else {
            setType(selectedOption ? selectedOption.value : null);
        }
    };

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={formatedOptions}
                isMulti={multi}
            />
        </div>
    );
};

export default DropDownComponent;
