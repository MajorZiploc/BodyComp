import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <Navbar id='header' collapseOnSelect variant='dark' bg='dark'>
      <Navbar.Brand id='logo' as={Link} to='/'>
        Fitness Tracker
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <NavItem id='bulk-upload'>
            <Nav.Link as={Link} to='/bulkUpload'>
              Bulk Upload
            </Nav.Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
      {/* <Navbar.Collapse className='justify-content-end'>
        {dbSyncTime == null ||
          (moment(dbSyncTime) < moment().subtract(12, 'minutes') && (
            <Navbar.Text>
              <Alert variant='danger' className='p-1 m-0'>
                Last database sync: {dbSyncTime ? dbSyncTime.toLocaleString() : 'Never'}
              </Alert>
            </Navbar.Text>
          ))}
        <div className='ml-2'>
          <Navbar.Text id='greeting-msg' className='mr-2'>
            Hello, {user.profile.name}!
          </Navbar.Text>
          <Navbar.Text id='log-out'>
            <Button variant='link' className='text-white' onClick={() => signoutRedirect()}>
              <i className='fas fa-sign-out-alt'></i>
              <span> </span>
              Log out
            </Button>
          </Navbar.Text>
        </div>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
