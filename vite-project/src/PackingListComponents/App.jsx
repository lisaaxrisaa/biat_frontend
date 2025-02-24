import { useState } from "react"

// import Logo from "./Logo"
import Form from "./Form"
import PackingList from "./PackingList"
import Stats from "./Stats"

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(newItem) {
    setItems(prev => [...prev, newItem])
  }

  function handleDeleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    )

    confirmed && setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}
