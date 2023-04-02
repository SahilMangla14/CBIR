import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
function CollapsibleExample() {
  const [name,setName] = useState('Methods')


  return (
    <Navbar collapseOnSelect expand="lg"  style={{borderRadius:'5px',opacity:'0.8',backgroundColor: 'rgb(251, 239, 239)', transition:'color:hsl(223,10%,5%)'}}>
      <Container>
        <Navbar.Brand>
          <Link to='/' style={{textDecoration:'None', color: 'rgb(0, 0, 0, 0.55)', fontWeight : '500'}}>
            CBIR
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title={name} id="collasible-nav-dropdown">
              <NavDropdown.Item  onClick={(event) => {
                // window.location.reload();
                event.preventDefault();
                setName('COLOR')
                fetch('http://localhost:5000/color',{
                  method: 'POST',
                  body: 'Color',
                  mode: 'cors',
                }).then((res)=>res.json).then((res)=>console.log(res)).then(data => {
                  // Handle fetched data here
                  console.log(data);
                  // Reload window after 5 seconds
                  setTimeout(() => {
                    window.location.reload();
                  },0);
                })
                
              }}>COLOR</NavDropdown.Item>
              <NavDropdown.Item  onClick={(event) => {
                // window.location.reload();
                event.preventDefault();
                setName('VGG')
                fetch('http://localhost:5000/vgg',{
                  method: 'POST',
                  body: 'VGG',
                  mode: 'cors',
                }).then((res)=>res.json).then((res)=>console.log(res)).then(data => {
                  // Handle fetched data here
                  console.log(data);
                  // Reload window after 5 seconds
                  setTimeout(() => {
                    window.location.reload();
                  },0);
                })
              }}>
                VGG
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(event) => { 
                // window.location.reload();
                event.preventDefault()
                setName('RESNET')
                fetch('http://localhost:5000/resnet',{
                  method: 'POST',
                  body: 'RESNET',
                  mode: 'cors',
                }).then((res)=>res.json).then((res)=>console.log(res)).then(data => {
                  // Handle fetched data here
                  console.log(data);
                  // Reload window after 5 seconds
                  setTimeout(() => {
                    window.location.reload();
                  },0);
                })
              }}>RESNET</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#about">About Project</Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;