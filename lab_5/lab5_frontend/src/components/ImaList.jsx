import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useQuery, useMutation } from '@apollo/client';
import queries from './queries';


export default function ImaList(props) {
    const postData = props.postData;

    const addTobins = (ele) => {
        console.log("add "+ele);
    }

    const removeFrombins = (ele) => {
        console.log("remove "+ele);
    }

    return (
        Object.values(postData).map(ele => {
            return (
                <Grid item xs={5} key={ele.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={ele.url}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Author: {ele.posterName}
                                <br />
                                Description: {ele.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                ele.binned ?
                                    <Button size="small" onClick={() => removeFrombins(ele)}>Remove from bin</Button> :
                                    <Button size="small" onClick={() => addTobins(ele)}>Add to bin</Button>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            );
        })
    )
}
