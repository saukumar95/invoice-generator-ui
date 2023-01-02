import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    const onItemizedItemEdit = this.props.onItemizedItemEdit;
    const currency = this.props.currency;
    const rowDel = this.props.onRowDel;
    const itemTable = this.props.items.map((item, index) => {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel} key={item.id || index} slNo={index} currency={currency} />
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th className="text-center">Description of work</th>
              <th className="text-center">Unit</th>
              <th className="text-center">Price/Rate</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent = () => {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{ minWidth: '70px' }}>
          <span>{this.props.slNo + 1}</span>
        </td>
        <td style={{ width: '100%' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              as: "textarea",
              name: "description",
              placeholder: "Work description",
              value: this.props.item.description,
              id: this.props.item.id
            }} />
        </td>
        <td style={{ minWidth: '70px' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "unit",
              value: this.props.item.unit,
              id: this.props.item.id,
            }} />
        </td>
        <td style={{ minWidth: '130px' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }} />
        </td>
        <td style={{ minWidth: '100px' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "0.01",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }} />
        </td>
        <td className="text-center" style={{ minWidth: '50px' }}>
          <BiTrash onClick={this.onDelEvent} style={{ height: '33px', width: '33px', padding: '7.5px' }} className="text-white mt-1 btn btn-danger" />
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;
