import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'
import { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Spinner,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import CustomerAutocomplete from '../CustomerAutocomplete'
import ProductAutocomplete from '../ProductAutocomplete'
import CreateInvoiceModal from '../CreateInvoiceModal/CreateInvoiceModal'

const InvoicesList = (): React.ReactElement => {
  const api = useApi()
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showCreateModal, setShowCreateMdal] = useState<boolean>(false)
  const [customer, setCustomer] = useState<Customer>({} as Customer)
  const [product, setProduct] = useState<Product>({} as Product)
  const [date, setDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')
  const [validated, setValidated] = useState(false)
  const [paid, setPaid] = useState<boolean>(false)
  const [finalized, setFinalized] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number | null>(null)

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices()
    setInvoicesList(data.invoices)
    setLoading(false)
  }, [api])

  const createInvoice = useCallback(async () => {
    const payload = {
      invoice: {
        customer_id: customer.id,
        finalized: finalized,
        paid: paid,
        date: date,
        deadline: deadline,
        invoice_lines_atributes: [
          {
            product_id: product.id,
            quantity: quantity,
            label: product.label,
            unit: product.unit,
            vat_rate: product.vat_rate,
            price: product.unit_price,
            tax: product.unit_tax,
          },
        ],
      },
    }
    console.log('payload', payload)
    const data = await api.postInvoices(undefined, payload)
    console.log('data', data)
    // fetchInvoices()
    setLoading(false)
  }, [api])

  const onClickCreate = () => setShowCreateMdal(true)
  const onClickClose = () => setShowCreateMdal(false)
  const handleSubmit = (event: any) => {
    console.log('date', date)
    console.log('deadlineevent', deadline)
    console.log('product', product)
    console.log('customer', customer)
    console.log('paid', paid ? paid : false)
    console.log('finalized', finalized)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    createInvoice()
    // setShowCreateMdal(false)
  }

  const onChangeCustomer = (cust: any) => {
    setCustomer(cust)
    console.log('customer', cust)
  }

  const onChangeProduct = (prod: any) => {
    setProduct(prod)
    console.log('customer', prod)
  }

  const onChangeDate = (event: any) => {
    const value = event.target.value
    setDate(value)
    console.log('ev.target.value', value)
  }

  const onChangeDeadline = (event: any) => {
    const value = event.target.value
    setDeadline(value)
    console.log('ev.target.value', value)
  }

  const onChangeFinalized = (event: any) => {
    setFinalized(event.target.checked)
  }

  const onChangePaid = (event: any) => {
    setPaid(event.target.checked)
  }

  const onChangeQuantity = (event: any) => {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return (
    <>
      <h1>Invoice List</h1>
      <h2>A list of invoices</h2>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={onClickCreate}>Create +</Button>
      </div>
      <CreateInvoiceModal
        showModal={showCreateModal}
        hideModal={onClickClose}
      ></CreateInvoiceModal>
      {/* <Modal show={showCreateModal} onHide={onClickClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create an invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Form noValidate validated={validated}>
              <Row>
                <Form.Group
                  as={Col}
                  name="customer"
                  className="mb-3"
                  controlId="customer"
                >
                  <Form.Label>Customer</Form.Label>
                  <Form.Control
                    as={CustomerAutocomplete}
                    onChange={onChangeCustomer}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  name="product"
                  className="mb-3"
                  controlId="product"
                >
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as={ProductAutocomplete}
                    onChange={onChangeProduct}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  name="quantity"
                  className="mb-3"
                  controlId="quantity"
                >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" onChange={onChangeQuantity} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="date"
                    value={date}
                    onChange={onChangeDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="deadlineDate">
                  <Form.Label>Deadline Date</Form.Label>
                  <Form.Control
                    name="deadline"
                    required
                    type="date"
                    value={deadline}
                    onChange={onChangeDeadline}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a deadline.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="paid">
                  <Form.Check
                    name="paid"
                    type="checkbox"
                    label="Paid"
                    value="false"
                    onChange={onChangePaid}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="finalized">
                  <Form.Check
                    name="finalized"
                    type="checkbox"
                    label="Finalized"
                    value="false"
                    onChange={onChangeFinalized}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal> */}
      {loading ? (
        <div style={{ padding: '10rem 10rem', textAlign: 'center' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
              <th>Tax</th>
              <th>Finalized</th>
              <th>Paid</th>
              <th>Date</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoicesList.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>
                  {invoice.customer?.first_name} {invoice.customer?.last_name}
                </td>
                <td>
                  {invoice.customer?.address}, {invoice.customer?.zip_code}{' '}
                  {invoice.customer?.city}
                </td>
                <td>{invoice.total}</td>
                <td>{invoice.tax}</td>
                <td>{invoice.finalized ? 'Yes' : 'No'}</td>
                <td>{invoice.paid ? 'Yes' : 'No'}</td>
                <td>{invoice.date}</td>
                <td>{invoice.deadline}</td>
                <td>
                  <Link to={`invoice/${invoice.id}`} className="link">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default InvoicesList
