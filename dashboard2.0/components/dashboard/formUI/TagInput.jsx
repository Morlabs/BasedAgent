import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid'; // Make sure to install and import your icon correctly

const TagInput = ({ tags, setTags, placeholder }) => {
    const createTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value.trim();
            if (value && !tags.includes(value)) {
                setTags([...tags, value]);
            }
            e.target.value = '';
        }
    };

    const removeTag = (e, index) => {
        e.preventDefault();
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-2">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:10 lg:gap-20'>
                <div className=''>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="bg-[#0b0b0c] block w-full rounded-md border-0 p-1.5 text-[#dadee2] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        onKeyPress={createTag}
                    />
                </div>
                <div className=" flex flex-wrap gap-2 md:max-w-[200px]">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-[#2d2d2d] rounded-md p-1.5">
                            <span className="text-sm font-semibold text-[#dadee2]">{tag}</span>
                            <button
                                onClick={(e) => removeTag(e, index)}
                                className="ml-1.5 text-[#dadee2] hover:text-white"
                            >
                                <XCircleIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagInput;
