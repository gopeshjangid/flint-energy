import React from 'react'
import { Dropdown, Menu} from  "semantic-ui-react";
import { withStyles  } from '@material-ui/core/styles';
import { DropdownMenu } from '..';
const useStyles = (theme)=>({
  main : {
    fontFamily: "'Lato', sans-serif",
    textTransform: 'uppercase',
    color: '#555',
    fontWeight : 600
  }
  
  });
const DropdownCustom = (props) => (
    <Dropdown text='Image Tools' pointing className={props.classes.main}>
      <Dropdown.Menu>
        <Dropdown.Header>Editor</Dropdown.Header>
        <Dropdown.Item>
          <Dropdown text='Convertor'>
            <Dropdown.Menu>
              <Dropdown.Header>JPG/Pn To PNG</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item>Image Resize</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Womens</Dropdown.Header>
              <Dropdown.Item>Dresses</Dropdown.Item>
              <Dropdown.Item>Shoes</Dropdown.Item>
              <Dropdown.Item>Bags</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>Home Goods</Dropdown.Item>
        <Dropdown.Item>Bedroom</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Order</Dropdown.Header>
        <Dropdown.Item>Status</Dropdown.Item>
        <Dropdown.Item>Cancellations</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
)

export default withStyles(useStyles)(DropdownCustom)