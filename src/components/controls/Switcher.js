import React, { Component } from 'react'

class Switcher extends Component {
  render() {
    const { className, opts, name, id, onChange, value, label } = this.props
    const optKeys = Object.keys(opts)
    return (
      <span className={className}>
        <span>{label}</span>
        {optKeys.map((optkey, i) => (
          <span key={optkey}>
            <input
              type="radio"
              name={name}
              id={`${id}-${i}`}
              checked={value === optkey}
              value={optkey}
              onChange={() => onChange(optkey)}
            />
            <label htmlFor={`${id}-${i}`}>{opts[optkey]}</label>
          </span>
        ))}
      </span>
    )
  }
}

export default Switcher
