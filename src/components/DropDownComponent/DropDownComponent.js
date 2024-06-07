"use client"
import React, { useState , useEffect} from 'react';
import Select from 'react-select';

const DropDownComponent = ({ options  , setType , multi}) => {
    const [formatedOptions, setFormatedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if ( options && options.length > 0) {
            const data = options.map(item => ({
                value: item.name,
                label: item.name,
                id: item.id
            }));
            setFormatedOptions(data);
        }
    }, [options]);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        if (multi) {
            const formattedSelection = selectedOption
                ? selectedOption.map(option => ({ name: option.value }))
                : [];

                console.log("test" , formattedSelection)
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