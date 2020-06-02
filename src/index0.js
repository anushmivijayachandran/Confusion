import React, { PureComponent } from 'react'
import { Modal, Button, Form, FormGroup, Row, Col, Spinner } from 'react-bootstrap'
import Radium from 'radium'
import { validEmail, validPhoneNo } from '@utils'

class UserModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fName: '',
      lName: '',
      phNo: '',
      email: '',
      country: '',
      state: '',
      phNoError: '',
      emailError: '',
      fNameError: '',
      lNameError: '',
      countryError: '',
      stateError: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { user, addModal, show } = this.props
    const { f_name: fName, l_name: lName, ph_no: phNo, email, country, state } = user
    if (prevProps.show !== show && !addModal) {
      this.setState({
        fName,
        lName,
        phNo,
        email,
        country,
        state,
      })
    }
  }

  setLoading = () =>
    this.setState({
      loading: true,
    })

  removeLoading = () =>
    this.setState({
      loading: false,
    })

  setError = field =>
    this.setState({
      [field]: true,
    })

  isValid = () => {
    const { fName, lName, phNo, email, country, state } = this.state
    let error = false
    if (!validEmail(email)) {
      error = true
      this.setError('emailError')
    }
    if (!validPhoneNo(phNo)) {
      error = true
      this.setError('phNoError')
    }
    if (!fName) {
      error = true
      this.setError('fNameError')
    }
    if (!lName) {
      error = true
      this.setError('lNameError')
    }
    if (!country) {
      error = true
      this.setError('countryError')
    }
    if (!state) {
      error = true
      this.setError('stateError')
    }
    if (error) return false
    return true
  }

  submit = async () => {
    const { fName, lName, phNo, email, country, state } = this.state
    const { onHide, id, addModal, submitAction } = this.props
    if (await !this.isValid()) return null
    this.setLoading()
    const user = {
      f_name: fName,
      l_name: lName,
      ph_no: phNo,
      email,
      country,
      state,
    }
    if (addModal) user.id = id
    const response = submitAction(user) // dispatch(leadsActions.editLead(lead))
    if (response) {
      return onHide()
    }
    this.setError()
    return this.removeLoading()
  }

  keyPressEnter = event => {
    if (event.key === 'enter') return this.submit
    return null
  }

  setValue = e =>
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: false,
    })

  render() {
    const { loading, fName, lName, phNo, email, country, state, phNoError, emailError, fNameError, lNameError, countryError, stateError } = this.state
    const { show, onHide, title } = this.props
    return (
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="add-leads-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title id="add-leads-modal-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <FormGroup controlId="f_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="fName"
                    value={fName}
                    onChange={e => this.setValue(e)}
                    placeholder="jon"
                    isInvalid={fNameError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">First Name cannot be empty</Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="l_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lName"
                    value={lName}
                    onChange={e => this.setValue(e)}
                    placeholder="doe"
                    isInvalid={lNameError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">Last Name cannot be empty</Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={country}
                    onChange={e => this.setValue(e)}
                    placeholder="Canada"
                    isInvalid={countryError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">Country is required</Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="state">
                  <Form.Label>State/Province</Form.Label>
                  <Form.Control
                    name="state"
                    value={state}
                    onChange={e => this.setValue(e)}
                    placeholder="Halifax"
                    isInvalid={stateError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">State is required</Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={email}
                    onChange={e => this.setValue(e)}
                    placeholder="jondoe@velsoft.com"
                    isInvalid={emailError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">Enter a valid email address</Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup controlId="ph_no">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phNo"
                    value={phNo}
                    onChange={e => this.setValue(e)}
                    placeholder="9000000000"
                    isInvalid={phNoError}
                    onKeyPress={e => this.keyPressEnter(e)}
                  />
                  <Form.Control.Feedback type="invalid">Enter a valid phone number</Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Col>
            <Button variant="secondary" onClick={onHide} disabled={loading} className="btn-spl">
              CANCEL
            </Button>
          </Col>
          <Col>
            <Button variant="info" onClick={this.submit} disabled={loading} className="btn-spl">
              {loading ? <Spinner animation="border" variant="light" /> : 'SAVE'}
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Radium(UserModal)
