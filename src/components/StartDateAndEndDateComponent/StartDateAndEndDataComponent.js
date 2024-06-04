import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StartDateAndEndDateComponent = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center mb-4">
        <label className="mr-4">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd-MM-yyyy" // Format the date
          placeholderText="Select start date"
          className="border border-gray-300 rounded py-2 px-3 hover:cursor-pointer"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-4">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd-MM-yyyy" // Format the date
          placeholderText="Select end date"
          className="border border-gray-300 rounded py-2 px-3 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default StartDateAndEndDateComponent;
