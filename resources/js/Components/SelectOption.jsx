// SelectOption.js
import React from 'react';

export default function SelectOption({ children,onChange,value }) {
    return (
        <select value={value} onChange={onChange} name="Type_user" id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {children}
        </select>
    );
}
