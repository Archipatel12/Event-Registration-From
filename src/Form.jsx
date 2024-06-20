// src/components/Form.jsx
import React, { useState, useEffect } from 'react';
import './Form.css'


// Custom hook for form handling
const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                setIsSubmitting(false);
                setIsSubmitted(true);
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors, isSubmitting]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitted(false);
    };

    return {
        values,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handleSubmit,
        resetForm
    };
};

const Form = () => {
    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = "Name is required.";
        }

        if (!values.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid.";
        }

        if (!values.age) {
            errors.age = "Age is required.";
        } else if (isNaN(values.age)) {
            errors.age = "Age must be a number.";
        }

        if (values.attendingWithGuest === 'yes' && !values.guestName) {
            errors.guestName = "Guest Name is required.";
        }

        return errors;
    };

    const { values, errors, isSubmitting, isSubmitted, handleChange, handleSubmit, resetForm } = useForm({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'no',
        guestName: ''
    }, validate);

    return (
        <div>
            <h1>Event Registration Form</h1>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: *</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <label>Email: *</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Age: *</label>
                        <input
                            type="number"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                        />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <div>
                        <label>Are you attending with a guest? *</label>
                        <select
                            name="attendingWithGuest"
                            value={values.attendingWithGuest}
                            onChange={handleChange}
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>
                    {values.attendingWithGuest === 'yes' && (
                        <div>
                            <label>Guest Name: *</label>
                            <input
                                type="text"
                                name="guestName"
                                value={values.guestName}
                                onChange={handleChange}
                            />
                            {errors.guestName && <p className="error">{errors.guestName}</p>}
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h2>Summary</h2>
                    <p><strong>Name:</strong> {values.name}</p>
                    <p><strong>Email:</strong> {values.email}</p>
                    <p><strong>Age:</strong> {values.age}</p>
                    <p><strong>Attending with Guest:</strong> {values.attendingWithGuest}</p>
                    {values.attendingWithGuest === 'yes' && (
                        <p><strong>Guest Name:</strong> {values.guestName}</p>
                    )}
                    <button onClick={resetForm}>Register Another</button>
                </div>
            )}
        </div>
    );
};

export default Form;
