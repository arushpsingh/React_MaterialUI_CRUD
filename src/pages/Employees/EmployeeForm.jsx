import React, { useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../component/controls/controls';
import {useForm, Form} from '../../component/useForm';
import * as employeeService from '../../services/EmployeeService';
import { nanoid } from 'nanoid';

const genderItems =[
    {id:'male', title:'Male'},
    {id:'female', title:'Female'},
    {id:'others', title:'Others'},
]

const EmployeeForm = (props) => {
    const { addOrEdit, recordForEdit } = props;

    const initialFValues = useMemo(() => ({
        id: nanoid(),
        name: '',
        email: '',
        mobile: '',
        city: '',
        gender: 'male', 
        deptId: '',
        hireDate: new Date(),
        isPermanent: false,
    }), [])

    const validate = (fieldValues = values) => { 
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers is required."
        if('deptId' in fieldValues)
            temp.deptId = fieldValues.deptId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })  

        if(fieldValues === values)
        return Object.values(temp).every(x => x === "")
    }

    const {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
            addOrEdit(values, resetForm);
    }

    useEffect(() => {
        if(recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return(
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input 
                            name="name" 
                            label="Full Name" 
                            value={values.name} 
                            onChange={handleInputChange}
                            error={errors.name}
                        />
                        <Controls.Input
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Input 
                            name="mobile" 
                            label="Mobile" 
                            value={values.mobile} 
                            onChange={handleInputChange}
                            error={errors.mobile}
                        />
                        <Controls.Input 
                            name="city" 
                            label="City" 
                            value={values.city} 
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.RadioGroup 
                            name="gender"
                            label="Gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            items={genderItems}
                        />
                        <Controls.Select 
                            name='deptId' 
                            label='Department'
                            value={values.deptId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            error={errors.deptId}
                        />
                        <Controls.DatePicker 
                            name="hireDate"
                            label="Hire Date"
                            values={values.hireDate}
                            onChange={handleInputChange}
                        />
                        <Controls.CheckBox 
                            name='isPermanent'
                            label='Permanent Employee'
                            values={values.isPermanent}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button 
                                type="submit"
                                text="Submit"
                            />
                            <Controls.Button 
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Form>
    )
}

export default EmployeeForm;
