import React, { useState } from 'react';
import PageHeader from '../../component/PageHeader';    
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EmployeeForm from './EmployeeForm';
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../component/usetable';
import * as employeeService from '../../services/EmployeeService';
import Controls from '../../component/controls/controls';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../component/Popup';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Notification from '../../component/Notification';

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput:{
        width:'70%',
    },
    newButton:{
        right: '1rem',
        position: 'absolute',
    }
}))

const headCells = [
    {id: 'name', label: 'Employee Name'},
    {id: 'email', label: 'Email Address (Personal)'},
    {id: 'mobile', label: 'Mobile Number'},
    {id: 'department', label: 'Department'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const Employee = () => {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({fn: items => {return items;}});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn)

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }
    
    const addOrEdit = (employee, resetForm) => {
        console.log("add employeeeLIst", employeeService.getAllEmployees())
        console.log("employee", employee)
        const isEmployeeExist = !!employeeService.getAllEmployees().find(em => em.id === employee.id)
        console.log("isEmployeeExist", isEmployeeExist)
        if(!isEmployeeExist)
            employeeService.insertEmployee(employee);
        else    
            employeeService.updateEmployee(employee);
        resetForm();
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success,'
        })
    }

    console.log("employeeeLIst", employeeService.getAllEmployees())

    const openInPopup = item => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = id => {
        if(window.confirm('Are you sure to delete this ?')){
            employeeService.deleteEmployee(id);
            setRecords(employeeService.getAllEmployees());
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error',
        })}
    }

    return(
        <>
            <PageHeader 
                title="New Employee" 
                subtitle="Form design with validation" 
                icon={<PeopleOutlineIcon fontSize="small"/>}
            />
            <Paper className={classes.pageContent}>
                
                <Toolbar>   
                    <Controls.Input 
                        className={classes.searchInput}
                        label="Search Employees"
                        InputProps={{
                                startAdornment: (<InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button 
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton 
                                            color= 'primary'
                                            onClick={() => {openInPopup(item)}}>
                                            <EditIcon fontSize='small'/> 
                                        </Controls.ActionButton>
                                        <Controls.ActionButton 
                                            color='secondary'
                                            onClick={() => {onDelete(item.id)}}
                                        >
                                            <DeleteIcon fontSize='small'/>
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification 
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default Employee;
