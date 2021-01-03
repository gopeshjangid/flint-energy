import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    formLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
    }
}));
export default function LabelBottomNavigation(props) {
    const classes = useStyles();
    console.log(props.radioGroup);
    return <FormControl component="fieldset" className={classes.form}>
        <FormLabel color="secondary" className={classes.formLabel}>{props.title}</FormLabel>
        <RadioGroup row>
            {

                props.radioGroup.map((radio) => {
                    return <FormControlLabel value={radio.value} control={<Radio color="secondary" />} label={radio.label} />
                })
            }
        </RadioGroup>
    </FormControl>

}


