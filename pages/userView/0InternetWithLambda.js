import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Component } from 'react';
import { useRouter } from 'next/router'

import schema from '../../schemas/0InternetWithLambda.schema.json';
import uischema from '../../schemas/0InternetWithLambda.ui.schema.json';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';

import { makeStyles } from '@mui/styles';




const useStyles = makeStyles({
    container: {
        padding: '1em',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        padding: '0.25em',
    },
    dataContent: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '0.25em',
        backgroundColor: '#cecece',
        marginBottom: '1rem',
    },
    resetButton: {
        margin: 'auto !important',
        display: 'block !important',
    },
    demoform: {
        margin: 'auto',
        padding: '1rem',
    },
});

const initialData = {

};

const renderers = [
    ...materialRenderers
    //register custom renderers

];



export default function Form() {
    const router = useRouter()
    
    //schema['properties']['Fiber']['enum'] = ['What I got from the API']

    const classes = useStyles();
    const [data, setData] = useState(initialData);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    const sendData = async () => {
        alert(JSON.stringify(data))
        window.location.href = '/userView/4ReviewShoppingCart?name=' + router.query['name'] + '&phoneNumber=' + router.query['phone'];
    };


    return (
        <Fragment>

            <Grid
                container
                justifyContent={'center'}
                spacing={1}
                className={classes.container}
            >

                <Grid item sm={6}>
                    <Typography variant={'h4'} className={classes.title}>Hello, {router.query['name']}</Typography>
                    <Typography variant={'h6'} className={classes.title}>Your phone {router.query['phone']} has the following offers available:</Typography>

                    <div className={classes.demoform}>
                        <JsonForms
                            schema={schema}
                            uischema={uischema}
                            //data={data}
                            renderers={renderers}
                            cells={materialCells}
                            onChange={({ errors, data }) => setData(data)}
                        />
                    </div>
                    <Button
                        className={classes.resetButton}
                        onClick={sendData}
                        color='primary'
                        variant='contained'
                    >
                        Submit
                    </Button>

                </Grid>

            </Grid>


        </Fragment>


    );
};