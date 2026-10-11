import React from 'react'
import ReactDOM from 'react-dom/client'
import EntryGate from '@/app/EntryGate'
import '@/styles/globals.css'
import '@/styles/scenes.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EntryGate />
  </React.StrictMode>,
)
