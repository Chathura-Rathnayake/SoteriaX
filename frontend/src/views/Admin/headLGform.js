// import { Grid, TextField, makeStyles } from '@material-ui/core'
// import React, { useState, useEffect} from 'react'
// import Controls from "../../components/Admin/controls/Controls";
// import { useForm, Form } from '../../components/Admin/useForm';

// const useStyles = makeStyles(theme=> ({
//     root: {
//         '& .MuiFormControl-root': {
//             width: '80%',
//             margin: theme.spacing(1)
//         }
//     }
// }))

// const genderItems = [
//         { id: 'Support', title: 'Support' },
//         { id: 'female', title: 'Female' },
//         { id: 'other', title: 'Other' },
//      ]

// const initialFvalues = {
//     id: 0,
//     firstName: '',
//     lastName: '',
//     email: '',
//     contactNumber: '',
//     Age: '',
//     userName: '',
//     password: '',
//     addedDate: new Date(),
//     companyName: '',
//     companyAddress: '',
//     companyEmail: '',
//     cContactNumber: '',
//     subscriptionType: 'Support'
// }

// export default function HeadLGform()
// {
//     const [values, setValues] = useState(initialFvalues)
//     const classes = useStyles();
    
//     const handleInputChange = e => {
//         const {name, value} = e.target
//         setValues({
//             ...values,
//             [name]:value
//         })
//     }

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Grid container>
//                 <Grid item xs={6}>
//                     <Controls.Input
//                         name="firstName"
//                         label="First Name"
//                         value={values.firstName}
//                         onChange={handleInputChange}
//                        // error={errors.firstName}
//                     />
//                     <Controls.Input
//                         name="lastName"
//                         label="Last Name"
//                         value={values.lastName}
//                         onChange={handleInputChange}
//                         //error={errors.lastName}
//                     />
//                     <Controls.Input
//                         label="Email"
//                         name="email"
//                         value={values.email}
//                         onChange={handleInputChange}
//                         //error={errors.email}
//                     />
//                     <Controls.Input
//                         label="Contact number"
//                         name="contactNumber"
//                         value={values.contactNumber}
//                         onChange={handleInputChange}
//                         //error={errors.contactNumber}
//                     />
//                     <Controls.Input
//                         label="Age"
//                         name="age"
//                         value={values.age}
//                         onChange={handleInputChange}
//                     />
//                     <Controls.DatePicker
//                         name="addedDate"
//                         label="Date"
//                         value={values.addedDate}
//                         onChange={handleInputChange}
//                     />
//                     <Controls.Input
//                         label="Username"
//                         name="userName"
//                         value={values.userName}
//                         onChange={handleInputChange}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     {/* <Controls.RadioGroup
//                         name="gender"
//                         label="Gender"
//                         value={values.gender}
//                         onChange={handleInputChange}
//                         items={genderItems}
//                     /> */}
//                     <Controls.Input
//                         label="Company name"
//                         name="companyName"
//                         value={values.companyName}
//                         onChange={handleInputChange}
//                     />
//                     <Controls.Input
//                         label="Company address"
//                         name="companyAddress"
//                         value={values.companyAddress}
//                         onChange={handleInputChange}
//                     />
//                     <Controls.Input
//                         label="Company email address"
//                         name="companyEmail"
//                         value={values.companyEmail}
//                         onChange={handleInputChange}
//                         //error={errors.companyEmail}
//                     />
//                     <Controls.Input
//                         label="Company phone number"
//                         name="cContactNumber"
//                         value={values.cContactNumber}
//                         onChange={handleInputChange}
//                         //error={errors.cContactNumber}
//                     />
//                     <Controls.RadioGroup
//                         name="subscriptionType"
//                         label="Subscription Type"
//                         value={values.subscriptionType}
//                         onChange={handleInputChange}
//                         items={genderItems}
//                     />
//                     {/* <Controls.Checkbox
//                         name="isPermanent"
//                         label="Permanent Employee"
//                         value={values.isPermanent}
//                         onChange={handleInputChange}
//                     /> */}

//                     <div>
//                         <Controls.Button
//                             type="submit"
//                             text="Submit" />
//                         <Controls.Button
//                             text="Reset"
//                             color="default"
//                             onClick={resetForm} />
//                     </div>
//                 </Grid>
//             </Grid>
//         </Form>
//     )
// }


import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/Admin/controls/Controls";
import { useForm, Form } from '../../components/Admin/useForm';
import * as employeeService from "../../components/Admin/services/hlServices";


const genderItems = [
    { id: 'sup', title: 'With Support' },
    { id: 'nosup', title: 'Without Support' },
]

const initialFValues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    age: '',
    userName: '',
    addedDate: new Date(),
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    cContactNumber: '',
    subscriptionType: 'Support'
}

export default function HeadLGform(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.fullName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.fullName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('contactNumber' in fieldValues)
            temp.mobile = fieldValues.contactNumber.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid item lg={12}>
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Contact number"
                        name="contactNumber"
                        value={values.contactNumber}
                        onChange={handleInputChange}
                        error={errors.contactNumber}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px', marginBottom:'8px'}}
                        label="Age"
                        name="age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.DatePicker style={{marginTop:'20px'}}
                        name="addedDate"
                        label="Date"
                        value={values.addedDate}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Username"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                    />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {/* <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    /> */}
                    <Grid item lg={12}>
                    <Controls.Input
                        label="Company name"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Company address"
                        name="companyAddress"
                        value={values.companyAddress}
                        onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Company email address"
                        name="companyEmail"
                        value={values.companyEmail}
                        onChange={handleInputChange}
                        error={errors.companyEmail}
                    />
                    </Grid>
                    <Grid item lg={12}>
                    <Controls.Input style={{marginTop:'8px'}}
                        label="Company phone number"
                        name="cContactNumber"
                        value={values.cContactNumber}
                        onChange={handleInputChange}
                        error={errors.cContactNumber}
                    />
                    </Grid>
                    <Grid item lg={12} style={{marginTop:'15px'}}>
                    <Controls.RadioGroup 
                        name="subscriptionType"
                        label="Subscription Type"
                        value={values.subscriptionType}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    </Grid>
                    {/* <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    /> */}

                    <div style={{marginTop:'25px'}}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
