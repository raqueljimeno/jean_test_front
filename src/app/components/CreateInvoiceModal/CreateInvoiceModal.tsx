import { useFormik, Formik } from 'formik'
import { Button, Container, Modal, Row, Col } from 'react-bootstrap'

interface CreateModalProps {
  showModal: boolean
  hideModal: () => void
}

const CreateInvoiceModal: React.FunctionComponent<CreateModalProps> = ({
  showModal,
  hideModal,
}) => {
  const handleSubmit = () => {
    hideModal()
  }

  const formik = useFormik({
    initialValues: {
      customer: '',
      date: '',
      deadline: '',
      paid: undefined,
      product: '',
      quantity: '',
      finalized: undefined,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <>
      <Modal show={showModal} onHide={hideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create an invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Formik onSubmit={() => formik.handleSubmit}>
              <Row>
                <Col>
                  <label htmlFor="customer">Customer</label>
                  <input
                    id="customer"
                    name="customer"
                    onChange={formik.handleChange}
                    value={formik.values.customer}
                  />
                </Col>
                <Col>
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.deadline}
                  />
                </Col>
                <Col>
                  <label htmlFor="paid">Paid</label>
                  <input
                    id="paid"
                    name="paid"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.paid}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="product">Product</label>
                  <input
                    id="product"
                    name="product"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.product}
                  />
                </Col>
                <Col>
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="finalized">Finalized</label>
                  <input
                    id="finalized"
                    name="finalized"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.finalized}
                  />
                </Col>
              </Row>
              <button type="submit">Submit</button>
            </Formik>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateInvoiceModal
