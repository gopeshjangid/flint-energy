import React from 'react';
import MaterialTable from 'material-table';
import Head from  "next/head";
export default class extends React.PureComponent {
   

    

  render(){
    return (<>
    <Head>
      <link
       rel="stylesheet"
       href="https://fonts.googleapis.com/icon?family=Material+Icons"
     />
    </Head>
    <MaterialTable
      title={this.props.title}
      columns={this.props.columns}
      data={this.props.rows}
      editable={this.props.editable}
      actions={this.props.actions}
    />
  </>);
  }
 
}
