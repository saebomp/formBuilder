import React from 'react'

const getStyles = () => ({
  title: {
    fontSize:50,
    padding:'15px',
    marginBottom:'50px',
    textAlign:'center'
  }
})

const Title = () => {
  const styles = getStyles()
  return <h1 style={styles.title}>Form Builder</h1>
}

export default Title