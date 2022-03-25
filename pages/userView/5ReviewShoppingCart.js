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

import sampleCart from './sample/shoppingCart.json';


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


const apiUrl = "http://localhost:8663/tmf-api/shoppingCart/v4/shoppingCart"

const renderers = [
    ...materialRenderers
    //register custom renderers

];

export async function getServerSideProps(){
    const res = await fetch(apiUrl + "/1203")

    const fetchedData =  await res.json()

    let shoppingCart = {
        "Products" : []
    }

    fetchedData?.cartItem.forEach(element => {
        // Summing up total price based on how many taxIncludedAmount there are.
        let totalPrice = 0
        element?.itemTotalPrice.forEach(currentPrice => {
            totalPrice += parseFloat(currentPrice.price.taxIncludedAmount.value)
        })

        // Mapping the data to a simpler json object in order to pre-populate form.
        shoppingCart.Products.push({
            "id": element.id,
            "name": element?.product?.name || "no name",
            "quantity": element?.quantity || 1,
            "totalPrice": String(totalPrice)
        })
    });

    // console.log(fetchedData)
    return {
        props: {
            shoppingCart,
            fetchedData
        }
    };
}

export default function Form(props) {
    let shoppingCart = props["shoppingCart"]
    let fetchedData = props["fetchedData"]
    
    const router = useRouter()

    const classes = useStyles();
    const [data, setData] = useState(shoppingCart);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    const sendData = async () => {
        console.log(fetchedData);
        

        console.log("NEW CART", newCartItems)

        // shoppingCart.forEach(currentItem, index => {
        //     fetchedData.cartItem[index].id = currentItem.id
        //     fetchedData.cartItem[index].name = currentItem.product.name
        //     fetchedData.cartItem[index].quantity = currentItem.quantity
        //     fetchedData.cartItem[index]?.itemPrice[0]?.price?.taxIncludedAmount?.value = currentItem.totalPrice
        // })

        //console.log(fetchedData)
        
        // alert("Installing requested parts of the canvas, this will take a couple of minutes, you will be redirected when the installation finishes")
        let newCartItems = []
        console.log(shoppingCart)
        fetchedData.cartItem.forEach(cartItem => {
            data.Products.forEach(scP => {
                console.log(cartItem.id, scP.id)
                if(cartItem.id == scP.id) {
                    newCartItems.push(cartItem)
                }

            });

        })
        console.log("nci", newCartItems)
        

        
        const response = await fetch('/api/updateShoppingCart/1203', {
          method: 'PATCH',
          body: JSON.stringify({
              cartItem: newCartItems
          })
        })
        const reStatus = await response.status
        console.log(reStatus)
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