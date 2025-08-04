import React, { Component } from 'react'

export default class Four extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'four'
    }
  }

  componentDidMount() {
    console.log('four', this.props);
  }

  componentWillUnmount() {
    console.log('four will unmount');
  }

  render() {
    return (
      <div>
        <h1>four</h1>
      </div>
    )
  }
}

