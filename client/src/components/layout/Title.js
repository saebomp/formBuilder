import React from 'react'

const getStyles = () => ({
  title: {
    fontSize:30,
    padding:'15px',
    marginBottom:'20px',
    textAlign:'center'
  }
})

const Title = () => {
  const styles = getStyles()
  return <h1 style={styles.title}>FORM BUILDER</h1>
}

export default Title