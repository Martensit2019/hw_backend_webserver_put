document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id
    remove(id).then(() => {
      e.target.closest('li').remove()
    })
  }
})
document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'edit') {
    const title = target.closest('li').querySelector('span').textContent
    const newTitle = prompt('Введите новое название', title)
    if (newTitle !== title && newTitle !== null) {
      const id = target.dataset.id
      update(id, newTitle).then(() => {
        target.closest('li').querySelector('span').textContent = newTitle
      })
    } else {
      return
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  })
}
async function update(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}