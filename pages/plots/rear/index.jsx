import React, { useState, useCallback } from 'react'

import SimpleTitle from '@components/templates/SimpleTitle'

import styles from '@styles/pages.module.css'

const Index = () => {
  const [show_grid, set_show_grid] = useState(false)

  const LabelsRef = useCallback(node => {
    if (node != null && node.children.length == 1 && show_grid) {
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 24; j++) {
          let colLetter = String.fromCharCode(97 + i).toUpperCase()
          let rowLetter = String.fromCharCode(97 + j).toUpperCase()
          node.insertAdjacentHTML('beforeend', `<label style="grid-column: ${i + 1} / span 1; grid-row: ${j + 1} / span 1; align-self: center; justify-self: center">${rowLetter} ${colLetter}</label>`)
        }
      }
    } else if (node != null && !show_grid) {
      while (node.children.length > 1) {
        node.removeChild(node.lastChild)
      }
    }
  }, [show_grid])

  const toggleGridState = () => {
    set_show_grid(!show_grid)
    console.log(show_grid)
  }

  return(<>
    <SimpleTitle title='Rear' link='plots' />
    <button onClick={toggleGridState}>{show_grid ? 'Hide Grid' : 'Show Grid'}</button>
    <div className={`${styles.layoutDiagramWrapper} ${styles.layoutDiagramWrapperRear}`} ref={LabelsRef}>
      <img
        src='/images/Rear.svg'
        alt='Rear garden layout diagram'
      />
    </div>
  </>)
}

export default Index