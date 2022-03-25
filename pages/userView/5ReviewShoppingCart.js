import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Component } from 'react';
import { useRouter } from 'next/router'

import schema from '../../schemas/0InternetWithLambda.schema.json';
import cart_schema from './sample/cart.schema.json';
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
    "Products": [{
        "id": "aaa",
        "href": "http://",
        "name": "aaa",
    }]
};

const renderers = [
    ...materialRenderers
    //register custom renderers

];



export default function Form() {
    const router = useRouter()

    const classes = useStyles();
    const [data, setData] = useState(initialData);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    const sendData = async () => {
        // alert("Installing requested parts of the canvas, this will take a couple of minutes, you will be redirected when the installation finishes")
        const response = await fetch('/api/updateShoppingCart/1203', {
          method: 'POST',
          body: JSON.stringify(data)
        })
        // const reStatus = await response.status
        // console.log(rData["logs"])
        // window.location.href = '/userView/shoppingCartUpdate?status='+ response.status;
    };


    // const sendData = async () => {
    //     console.log(JSON.stringify(data));
    // }

    return (
        <Fragment>

            <Grid
                container
                justifyContent={'center'}
                spacing={1}
                className={classes.container}
            >

                <Grid item sm={6}>

                    <div className={classes.demoform}>
                        <JsonForms
                            schema={cart_schema}
                            // uischema={uischema}
                            data={data}
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