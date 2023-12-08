import React, { Component } from 'react';

class HeaderComponet extends Component {
  constructor(props) {
    super(props);
    this.state = {

        users:[]
    };
  }

  
  render() {
    

    return (
      <div>
       <header>
        <nav>
            <div>
                <a href="">User Management</a>
            </div>
        </nav>
       </header>
      </div>
    );
  }
}

export default HeaderComponet;
